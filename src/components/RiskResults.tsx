import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { RiskData } from '../types';

interface RiskResultsProps {
  hasResult: boolean;
  riskData: RiskData | null;
  onReset: () => void;
}

// Paleta de colores. El último (gris) se usará siempre para "Otros Factores"
const CHART_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#94a3b8'];

// Componente personalizado para que al pasar el mouse te liste las variables
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg max-w-[200px]">
        <p className="font-bold text-slate-800 text-sm">{data.name}</p>
        <p className="text-blue-600 font-semibold text-sm">{data.value}% de influencia</p>
        {data.detalle && (
          <p className="text-xs text-slate-500 mt-2 leading-tight">
            <span className="font-semibold">Incluye:</span> {data.detalle}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function RiskResults({ hasResult, riskData, onReset }: RiskResultsProps) {
  if (!hasResult || !riskData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center justify-center h-full min-h-[400px]">
        <div className="text-center text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-30 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p className="text-base">El panel de predicción está listo.</p>
        </div>
      </div>
    );
  }

  const isHighRisk = riskData.nivel === 'alto';
  const probabilityData = [
    { name: 'Riesgo', value: riskData.probabilidad, color: isHighRisk ? '#ef4444' : '#10b981' }, 
    { name: 'Libre', value: 100 - riskData.probabilidad, color: '#f1f5f9' } 
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 h-full flex flex-col overflow-hidden">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 border-b pb-3 gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Resultado Clínico</h3>
        </div>
        <div className={`px-3 py-1.5 rounded-lg font-bold text-sm text-center w-full sm:w-auto ${isHighRisk ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
          {riskData.alerta}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full max-w-lg mx-auto">
        
        {/* Gráfica de Anillo (Altura reducida de h-48 a h-36 para Laptops) */}
        <div className="relative w-36 h-36 mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={probabilityData}
                cx="50%" cy="50%"
                innerRadius={55} outerRadius={70}
                startAngle={90} endAngle={-270}
                dataKey="value" stroke="none"
              >
                {probabilityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold tracking-tight ${isHighRisk ? 'text-red-600' : 'text-emerald-600'}`}>
              {riskData.probabilidad}%
            </span>
          </div>
        </div>
        
        {/* Gráfica SHAP (Altura reducida a h-64 y colores dinámicos) */}
        <div className="w-full h-[260px] border-t border-slate-100 pt-4">
          <h4 className="text-xs font-bold text-slate-500 text-center mb-1 uppercase tracking-wide">
            Pesos Predictivos
          </h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 10, right: 80, bottom: 10, left: 80 }}>
              <Pie 
                data={riskData.factores} 
                cx="50%" cy="50%" 
                innerRadius={45} outerRadius={65} 
                paddingAngle={3} dataKey="value" stroke="none"
                label={({ name, value }) => name === 'Otros Factores' ? `Otros (${value}%)` : `${name} (${value}%)`}
                labelLine={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '3 3' }}
                style={{ fontSize: '10px', fontWeight: 'bold', fill: '#334155' }}
              >
                {riskData.factores.map((entry, index) => {
                  // Si el factor se llama "Otros Factores", lo pintamos de gris. Si no, tomamos la paleta.
                  const color = entry.name === 'Otros Factores' ? '#94a3b8' : CHART_COLORS[index % (CHART_COLORS.length - 1)];
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
      </div>

      <div className="mt-2 border-t border-slate-100 pt-3 text-center">
        <button onClick={onReset} className="text-xs font-medium text-blue-600 hover:text-blue-800 underline transition-colors">
          Nuevo Paciente
        </button>
      </div>
    </div>
  );
}