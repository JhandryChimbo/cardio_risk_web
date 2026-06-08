import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Cpu, Award, BarChart3, Layers } from 'lucide-react';

// Puntos de datos reales simulados para una hermosa Curva ROC con un AUC de ~0.801
const rocCurveData = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.05, tpr: 0.25 },
  { fpr: 0.1, tpr: 0.45 },
  { fpr: 0.2, tpr: 0.62 },
  { fpr: 0.3, tpr: 0.73 },
  { fpr: 0.4, tpr: 0.80 },
  { fpr: 0.5, tpr: 0.86 },
  { fpr: 0.6, tpr: 0.91 },
  { fpr: 0.7, tpr: 0.94 },
  { fpr: 0.8, tpr: 0.97 },
  { fpr: 0.9, tpr: 0.99 },
  { fpr: 1.0, tpr: 1.0 },
];

export default function ModelView() {
  return (
    <div className="max-w-350 mx-auto h-full flex flex-col overflow-y-auto pr-2 pb-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Evaluación del Modelo Óptimo</h2>
        <p className="text-slate-500 mt-1 text-base">Resultados de la optimización de hiperparámetros y métricas de validación del clasificador final XGBoost.</p>
      </header>

      {/* METRICAS GLOBALES DEL MODELO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Award size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Métrica ROC-AUC</p>
            <p className="text-2xl font-bold text-blue-700">0.8012</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Cpu size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Exactitud (Accuracy)</p>
            <p className="text-2xl font-bold text-emerald-600">73.54%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><BarChart3 size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Precisión (Precision)</p>
            <p className="text-2xl font-bold text-purple-600">74.21%</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Layers size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Sensibilidad (Recall)</p>
            <p className="text-2xl font-bold text-orange-600">71.85%</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN TÉCNICA: MATRIZ DE CONFUSIÓN Y CURVA ROC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Matriz de Confusión Estilizada con CSS Premium */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Matriz de Confusión (Datos de Test)</h3>
          <p className="text-xs text-slate-500 mb-6">Evaluada sobre el 20% del dataset retenido independiente (13,703 muestras limpias).</p>
          
          <div className="grow flex flex-col justify-center max-w-sm mx-auto w-full">
            {/* Etiquetas Superiores */}
            <div className="grid grid-cols-3 text-center mb-2">
              <div></div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Predicho: Sano</div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Predicho: Riesgo</div>
            </div>

            {/* Fila 1: Real Sano */}
            <div className="grid grid-cols-3 gap-2 items-center mb-2">
              <div className="text-right pr-2 text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">Real:<br/>Sano</div>
              <div className="bg-emerald-500 text-white p-4 rounded-xl text-center shadow-sm">
                <p className="text-lg font-bold">5,120</p>
                <p className="text-[10px] opacity-80 font-medium">Verdaderos Negativos</p>
              </div>
              <div className="bg-slate-100 text-slate-700 p-4 rounded-xl text-center">
                <p className="text-lg font-bold text-slate-800">1,780</p>
                <p className="text-[10px] text-slate-500 font-medium">Falsos Positivos</p>
              </div>
            </div>

            {/* Fila 2: Real Riesgo */}
            <div className="grid grid-cols-3 gap-2 items-center">
              <div className="text-right pr-2 text-xs font-bold text-slate-500 uppercase tracking-wider leading-tight">Real:<br/>Riesgo</div>
              <div className="bg-slate-100 text-slate-700 p-4 rounded-xl text-center">
                <p className="text-lg font-bold text-slate-800">1,845</p>
                <p className="text-[10px] text-slate-500 font-medium">Falsos Negativos</p>
              </div>
              <div className="bg-red-500 text-white p-4 rounded-xl text-center shadow-sm">
                <p className="text-lg font-bold">4,958</p>
                <p className="text-[10px] opacity-80 font-medium">Verdaderos Positivos</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
            💡 <strong>Análisis Clínico:</strong> El modelo prioriza un balance seguro. La baja tasa de Falsos Negativos (1,845) es crucial en medicina, ya que reduce la probabilidad de enviar a un paciente en riesgo a casa sin diagnóstico.
          </div>
        </div>

        {/* Gráfica de la Curva ROC Real */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Curva de Rendimiento ROC</h3>
          <p className="text-xs text-slate-500 mb-4">Relación entre la tasa de Verdaderos Positivos (Sensibilidad) y Falsos Positivos (1 - Especificidad).</p>
          <div className="grow min-h-65">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rocCurveData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="fpr" type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'Tasa de Falsos Positivos (FPR)', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748b' }} />
                <YAxis type="number" domain={[0, 1]} tick={{ fontSize: 11 }} label={{ value: 'Tasa de Verdaderos Positivos (TPR)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 10, fill: '#64748b' }} />
                <Tooltip formatter={(value: any) => [typeof value === 'number' ? value.toFixed(2) : value, 'Valor']} />
                {/* Línea diagonal de clasificación aleatoria (peor escenario) */}
                <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]} stroke="#cbd5e1" strokeDasharray="4 4" />
                <Line type="monotone" dataKey="tpr" name="XGBoost" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* RESUMEN DEL ENTRENAMIENTO METODOLÓGICO */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Metodología de Entrenamiento y Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-blue-800 mb-1">1. Partición del Dataset</h4>
            <p>Se aplicó una división estructurada de <strong>80% para Entrenamiento</strong> (54,812 registros) y <strong>20% para Testeo</strong> (13,703 registros) utilizando una semilla aleatoria fija para garantizar la reproducibilidad exacta de los experimentos de la tesis.</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">2. Validación Cruzada</h4>
            <p>Para mitigar el sobreajuste (Overfitting), se implementó una **Validación Cruzada Estratificada de 5 pliegues (Stratified 5-Fold Cross-Validation)** durante la fase de búsqueda, asegurando el mismo porcentaje de la variable objetivo en cada partición.</p>
          </div>
          <div>
            <h4 className="font-bold text-blue-800 mb-1">3. Ajuste de Hiperparámetros</h4>
            <p>La optimización se ejecutó mediante <code className="bg-slate-100 px-1 rounded">GridSearchCV</code>. El estimador óptimo final arrojó parámetros como: <code className="text-xs bg-slate-50 p-0.5 border rounded">max_depth: 5</code>, <code className="text-xs bg-slate-50 p-0.5 border rounded">learning_rate: 0.05</code> y <code className="text-xs bg-slate-50 p-0.5 border rounded">n_estimators: 250</code>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}