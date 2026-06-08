import { useState } from 'react';
import type { FormData, RiskData } from './types';
import PatientForm from './components/PatientForm';
import RiskResults from './components/RiskResults';

function App() {
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [riskData, setRiskData] = useState<RiskData | null>(null);
  
  // NUEVO: Estado de carga
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    fecha_nacimiento: '', gender: '1', altura_cm: '', peso_kg: '',
    sistolica: '', diastolica: '', cholesterol: '1', gluc: '1',
    smoke: '0', alco: '0', active: '1'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDaysAlive = (dob: string): number => {
    if (!dob) return 0;
    const diffTime = Math.abs(new Date().getTime() - new Date(dob).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCalculate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 1. Bloqueamos el botón y activamos el estado de carga
    setIsLoading(true);
    
    const edad_dias_calculada = calculateDaysAlive(formData.fecha_nacimiento);
    
    const payload = {
      edad_dias: edad_dias_calculada,
      gender: parseInt(formData.gender),
      altura_cm: parseFloat(formData.altura_cm),
      peso_kg: parseFloat(formData.peso_kg),
      sistolica: parseInt(formData.sistolica),
      diastolica: parseInt(formData.diastolica),
      cholesterol: parseInt(formData.cholesterol),
      gluc: parseInt(formData.gluc),
      smoke: parseInt(formData.smoke),
      alco: parseInt(formData.alco),
      active: parseInt(formData.active)
    };

    try {
      const response = await fetch('https://cardio-risk-api-aibk.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Error en la comunicación con el servidor');
      }

      const data: RiskData = await response.json();
      setRiskData(data);
      setHasResult(true);

    } catch (error) {
      console.error("Error al predecir:", error);
      alert("Hubo un error al conectarse con el servidor de IA.");
    } finally {
      // 2. Sin importar si falla o tiene éxito, apagamos el estado de carga al terminar
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-12">
      <header className="bg-blue-900 text-white p-4 shadow-md mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-wide">Cardio AI Predictor</h1>
          <span className="text-sm bg-blue-800 px-3 py-1 rounded-full">Dashboard Clínico</span>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        <div className="xl:col-span-5">
          <PatientForm 
            formData={formData} 
            onChange={handleInputChange} 
            onSubmit={handleCalculate} 
            isLoading={isLoading} // <-- Pasamos el estado al formulario
          />
        </div>

        <div className="xl:col-span-7">
          <RiskResults 
            hasResult={hasResult} 
            riskData={riskData} 
            onReset={() => setHasResult(false)} 
          />
        </div>

      </main>
    </div>
  );
}

export default App;