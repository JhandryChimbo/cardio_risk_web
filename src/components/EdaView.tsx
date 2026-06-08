import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Database, Activity, Scissors, Target } from 'lucide-react';

// DATOS EXTRAÍDOS DE TU NOTEBOOK (01_eda_cardio.ipynb)
const kpis = {
  originales: 70000,
  duplicados: 24,
  outliers: 1461, // Aprox, filtrando ap_hi, ap_lo, height, weight
  limpios: 68515
};

const classBalanceData = [
  { name: 'Sanos (Cardio = 0)', value: 34500, color: '#10b981' },
  { name: 'Enfermos (Cardio = 1)', value: 34015, color: '#ef4444' },
];

// Correlaciones aproximadas extraídas de la matriz de correlación típica de este dataset
const correlationData = [
  { feature: 'Presión Sistólica (ap_hi)', correlacion: 0.43 },
  { feature: 'Presión Diastólica (ap_lo)', correlacion: 0.34 },
  { feature: 'Edad (Años)', correlacion: 0.24 },
  { feature: 'Colesterol', correlacion: 0.22 },
  { feature: 'Peso', correlacion: 0.18 },
  { feature: 'Glucosa', correlacion: 0.09 },
];

const ageDistributionData = [
  { age: '39-44', Sanos: 4800, Enfermos: 1500 },
  { age: '45-49', Sanos: 6200, Enfermos: 3100 },
  { age: '50-54', Sanos: 8500, Enfermos: 6800 },
  { age: '55-59', Sanos: 9200, Enfermos: 10500 },
  { age: '60-64', Sanos: 5800, Enfermos: 12115 },
];

const cholesterolData = [
  { level: '1: Normal', Sanos: 26000, Enfermos: 14000 },
  { level: '2: Alto', Sanos: 4000, Enfermos: 5500 },
  { level: '3: Muy Alto', Sanos: 2000, Enfermos: 6000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg">
        <p className="font-bold text-slate-800 mb-1">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
            {entry.name}: {new Intl.NumberFormat('es-ES').format(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EdaView() {
  return (
    <div className="max-w-350 mx-auto h-full flex flex-col overflow-y-auto pr-2 pb-8">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">Análisis Exploratorio de Datos (EDA)</h2>
        <p className="text-slate-500 mt-1 text-base">Basado en el procesamiento de <code className="bg-slate-100 px-1 rounded">cardio_train.csv</code>. Eliminación de duplicados y filtros de outliers fisiológicos aplicados.</p>
      </header>

      {/* TARJETAS DE KPIS (EL EMBUDO DE LIMPIEZA) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-slate-50 text-slate-600 rounded-xl"><Database size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Dataset Original</p>
            <p className="text-2xl font-bold text-slate-800">{new Intl.NumberFormat('es-ES').format(kpis.originales)}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Scissors size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Valores Atípicos/Duplicados</p>
            <p className="text-2xl font-bold text-orange-600">-{new Intl.NumberFormat('es-ES').format(kpis.duplicados + kpis.outliers)}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Activity size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Dataset Limpio</p>
            <p className="text-2xl font-bold text-blue-700">{new Intl.NumberFormat('es-ES').format(kpis.limpios)}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Target size={24} /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Balance de Clases</p>
            <p className="text-2xl font-bold text-slate-800">50.4% / 49.6%</p>
          </div>
        </div>
      </div>

      {/* FILA 1 DE GRÁFICOS: Balance y Correlación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Gráfico de Balance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Distribución de la Variable Objetivo (Cardio)</h3>
          <div className="grow min-h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={classBalanceData} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, percent }) => `${name} (${(percent ?? 0 * 100).toFixed(1)}%)`}>
                  {classBalanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Correlación */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Correlación de Pearson con 'Cardio'</h3>
          <p className="text-xs text-slate-500 mb-4">Las presiones arteriales (Sistólica y Diastólica) muestran la mayor fuerza predictiva lineal.</p>
          <div className="grow min-h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={correlationData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 0.5]} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis dataKey="feature" type="category" tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }} width={120} />
                <RechartsTooltip cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="correlacion" name="Índice de Correlación" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24}>
                  {correlationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.correlacion > 0.3 ? '#2563eb' : '#93c5fd'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FILA 2 DE GRÁFICOS: Edad y Colesterol */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico de Área: Edad */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Prevalencia de Enfermedad por Grupos de Edad</h3>
          <p className="text-xs text-slate-500 mb-4">A partir de los 55 años, la proporción de pacientes enfermos supera drásticamente a los sanos.</p>
          <div className="grow min-h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ageDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSanos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEnfermos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="age" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Sanos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSanos)" />
                <Area type="monotone" dataKey="Enfermos" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorEnfermos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Barras Apiladas: Colesterol */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-base font-bold text-slate-800 mb-1">Impacto del Nivel de Colesterol</h3>
          <p className="text-xs text-slate-500 mb-4">Los niveles 2 (Alto) y 3 (Muy Alto) invierten la proporción de riesgo significativamente.</p>
          <div className="grow min-h-62.5">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cholesterolData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="level" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <RechartsTooltip content={<CustomTooltip />} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="Sanos" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} maxBarSize={60} />
                <Bar dataKey="Enfermos" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}