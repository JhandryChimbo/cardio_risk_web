import { useState } from 'react';
import type { FormData, RiskData } from '../types';
import PatientForm from './PatientForm';
import RiskResults from './RiskResults';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface DashboardProps {
  doctorProfile: { nombre: string; especialidad: string; hospital: string };
}

export default function Dashboard({ doctorProfile }: DashboardProps) {
  const [hasResult, setHasResult] = useState<boolean>(false);
  const [riskData, setRiskData] = useState<RiskData | null>(null);
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

  // NUEVO: Función para generar y descargar la plantilla de Excel
  const handleDownloadTemplate = () => {
    // Definimos los encabezados exactos con instrucciones claras para el médico
    const templateData = [
      [
        "Fecha Nacimiento (YYYY-MM-DD)", "Género (1=Mujer, 2=Hombre)", "Altura (cm)", 
        "Peso (kg)", "Sistólica", "Diastólica", "Colesterol (1=Normal, 2=Alto, 3=Muy Alto)", 
        "Glucosa (1=Normal, 2=Alta, 3=Muy Alta)", "Fuma (0=No, 1=Si)", "Alcohol (0=No, 1=Si)", "Activo (0=No, 1=Si)"
      ],
      // Fila de ejemplo
      ["1985-05-24", 2, 175, 82, 140, 90, 2, 1, 1, 0, 1] 
    ];

    const ws = XLSX.utils.aoa_to_sheet(templateData);
    
    // Auto-ajustar el ancho de las columnas para que se lea bien
    const wscols = templateData[0].map(header => ({ wch: String(header).length + 2 }));
    ws['!cols'] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla_Paciente");
    XLSX.writeFile(wb, "Plantilla_Importacion_CardioAI.xlsx");
  };

  // ACTUALIZADO: Ahora recibe un objeto File directamente desde la zona Drag & Drop
  const handleExcelImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 }) as any[];

        if (data.length < 2) {
          alert("El archivo Excel está vacío o no contiene la fila de datos.");
          return;
        }

        // Fila 0 = Encabezados, Fila 1 = Datos del Paciente
        const row = data[1];
        setFormData({
          fecha_nacimiento: String(row[0] || ''),
          gender: String(row[1] || '1'),
          altura_cm: String(row[2] || ''),
          peso_kg: String(row[3] || ''),
          sistolica: String(row[4] || ''),
          diastolica: String(row[5] || ''),
          cholesterol: String(row[6] || '1'),
          gluc: String(row[7] || '1'),
          smoke: String(row[8] == 1 || row[8] == '1' ? '1' : '0'),
          alco: String(row[9] == 1 || row[9] == '1' ? '1' : '0'),
          active: String(row[10] == 1 || row[10] == '1' ? '1' : '0'),
        });
        alert("¡Ficha clínica del paciente importada con éxito!");
      } catch (err) {
        alert("Error al procesar el archivo. Asegúrate de usar la plantilla correcta.");
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleExportReport = (format: 'pdf' | 'excel' | 'csv') => {
    if (!riskData) return;

    if (format === 'pdf') {
      const doc = new jsPDF();
      doc.setFillColor(30, 58, 138); 
      doc.rect(0, 0, 220, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text("CARDIO AI PREDICTOR - REPORTE CLÍNICO", 14, 16);

      doc.setTextColor(51, 65, 85);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`Institución: ${doctorProfile.hospital}`, 14, 35);
      doc.setFont("helvetica", "normal");
      doc.text(`Médico Especialista: ${doctorProfile.nombre} (${doctorProfile.especialidad})`, 14, 41);
      doc.text(`Fecha de Emisión: ${new Date().toLocaleDateString()}`, 14, 47);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("1. Historia Clínica Analizada", 14, 58);
      
      (doc as any).autoTable({
        startY: 62,
        head: [['Parámetro Fisiológico', 'Valor del Paciente']],
        body: [
          ['Fecha de Nacimiento', formData.fecha_nacimiento],
          ['Género Clínico', formData.gender === '1' ? 'Femenino' : 'Masculino'],
          ['Estatura Física', `${formData.altura_cm} cm`],
          ['Peso Corporal', `${formData.peso_kg} kg`],
          ['Presión Arterial Sistólica (ap_hi)', `${formData.sistolica} mmHg`],
          ['Presión Arterial Diastólica (ap_lo)', `${formData.diastolica} mmHg`],
          ['Categoría de Colesterol', formData.cholesterol === '3' ? 'Muy Alto' : formData.cholesterol === '2' ? 'Alto' : 'Normal'],
          ['Categoría de Glucemia', formData.gluc === '3' ? 'Muy Alta' : formData.gluc === '2' ? 'Alta' : 'Normal'],
          ['Hábitos de Tabaquismo', formData.smoke === '1' ? 'Sí' : 'No'],
          ['Consumo de Alcohol', formData.alco === '1' ? 'Sí' : 'No'],
          ['Índice de Actividad Física', formData.active === '1' ? 'Activo' : 'Sedentario'],
        ],
        theme: 'striped',
        headStyles: { fillBox: [51, 65, 85], fillColor: [51, 65, 85] }
      });

      const currentY = (doc as any).lastAutoTable.finalY + 12;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("2. Métrica de Riesgo de Inteligencia Artificial (XGBoost)", 14, currentY);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Probabilidad Matemática de Riesgo Cardiovascular: ${riskData.probabilidad}%`, 14, currentY + 8);
      doc.text(`Dictamen Clínico Automatizado: ${riskData.alerta}`, 14, currentY + 14);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("3. Grado de Explicabilidad Médica (Valores SHAP)", 14, currentY + 28);

      const rowsSHAP = riskData.factores.map(f => [f.name, `${f.value}%`]);
      (doc as any).autoTable({
        startY: currentY + 32,
        head: [['Factor de Riesgo', 'Porcentaje de Influencia en la Decisión']],
        body: rowsSHAP,
        theme: 'grid',
        headStyles: { fillColor: [37, 99, 235] }
      });

      const finalY = (doc as any).lastAutoTable.finalY + 20;
      doc.line(14, finalY, 80, finalY);
      doc.setFontSize(9);
      doc.text("Firma Médico Responsable", 14, finalY + 5);

      doc.save(`Reporte_Cardiologia_IA_${formData.fecha_nacimiento}.pdf`);
    } else {
      const tabularData = [{
          "Médico Validador": doctorProfile.nombre,
          "Hospital": doctorProfile.hospital,
          "Fecha Nacimiento": formData.fecha_nacimiento,
          "Género": formData.gender === '1' ? 'Mujer' : 'Hombre',
          "Altura_cm": formData.altura_cm,
          "Peso_kg": formData.peso_kg,
          "Sistolica": formData.sistolica,
          "Diastolica": formData.diastolica,
          "Colesterol": formData.cholesterol,
          "Glucosa": formData.gluc,
          "Fuma": formData.smoke,
          "Alcohol": formData.alco,
          "Activo": formData.active,
          "Probabilidad_IA_%": riskData.probabilidad,
          "Dictamen": riskData.alerta
      }];

      const ws = XLSX.utils.json_to_sheet(tabularData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Prediccion_IA");

      if (format === 'excel') {
        XLSX.writeFile(wb, `Analisis_Cardiovascular_${formData.fecha_nacimiento}.xlsx`);
      } else {
        XLSX.writeFile(wb, `Analisis_Cardiovascular_${formData.fecha_nacimiento}.csv`, { bookType: 'csv' });
      }
    }
  };

  const calculateDaysAlive = (dob: string): number => {
    if (!dob) return 0;
    const diffTime = Math.abs(new Date().getTime() - new Date(dob).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCalculate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const payload = {
      edad_dias: calculateDaysAlive(formData.fecha_nacimiento),
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

      if (!response.ok) throw new Error('Error en el servidor');
      const data: RiskData = await response.json();
      setRiskData(data);
      setHasResult(true);
    } catch (error) {
      console.error(error);
      alert("Hubo un error al conectarse con el servidor de IA.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-350 mx-auto grid grid-cols-1 xl:grid-cols-12 gap-6">
      <div className="xl:col-span-5">
        <PatientForm 
          formData={formData} 
          onChange={handleInputChange} 
          onSubmit={handleCalculate} 
          isLoading={isLoading} 
          onExcelImport={handleExcelImport}
          onDownloadTemplate={handleDownloadTemplate} // <-- Pasamos la nueva función
        />
      </div>
      <div className="xl:col-span-7">
        <RiskResults 
          hasResult={hasResult} 
          riskData={riskData} 
          onReset={() => setHasResult(false)} 
          onExportReport={handleExportReport} 
        />
      </div>
    </div>
  );
}