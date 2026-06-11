import { LayoutDashboard, Info, ChevronLeft, ChevronRight, Activity, BarChart2, Cpu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  currentView: 'dashboard' | 'info' | 'eda' | 'model';
  setCurrentView: (view: 'dashboard' | 'info' | 'eda' | 'model') => void;
}

export default function Sidebar({ isOpen, toggleSidebar, currentView, setCurrentView }: SidebarProps) {
  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-900 text-white transition-all duration-300 ease-in-out flex flex-col relative h-screen border-r border-blue-800 shadow-xl z-20`}>

      <button onClick={toggleSidebar} className="absolute -right-3 top-20 bg-blue-600 rounded-full p-1 border-2 border-slate-100 text-white hover:bg-blue-500 transition-colors z-30">
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="flex items-center justify-center h-20 border-b border-blue-800 pt-4 px-3">
        <Activity className="text-emerald-400 min-w-6" size={28} />
        {isOpen && <span className="ml-3 font-bold text-lg tracking-wide whitespace-nowrap overflow-hidden">Cardio AI</span>}
      </div>

      <div className="flex flex-col mt-6 gap-2 px-3">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`flex items-center px-3 py-3 rounded-lg transition-colors overflow-hidden ${currentView === 'dashboard' ? 'bg-blue-800 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'}`}
          title="Dashboard Predictivo"
        >
          <LayoutDashboard size={22} className="min-w-5.5" />
          {isOpen && <span className="ml-3 whitespace-nowrap">Panel Predictivo</span>}
        </button>

        <button
          onClick={() => setCurrentView('eda')}
          className={`flex items-center px-3 py-3 rounded-lg transition-colors overflow-hidden ${currentView === 'eda' ? 'bg-blue-800 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'}`}
          title="Análisis Exploratorio"
        >
          <BarChart2 size={22} className="min-w-5.5" />
          {isOpen && <span className="ml-3 whitespace-nowrap">Análisis EDA</span>}
        </button>

        <button
          onClick={() => setCurrentView('model')}
          className={`flex items-center px-3 py-3 rounded-lg transition-colors overflow-hidden ${currentView === 'model' ? 'bg-blue-800 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'}`}
          title="Rendimiento del Modelo"
        >
          <Cpu size={22} className="min-w-5.5" />
          {isOpen && <span className="ml-3 whitespace-nowrap">Métricas del Modelo</span>}
        </button>


        <button
          onClick={() => setCurrentView('info')}
          className={`flex items-center px-3 py-3 rounded-lg transition-colors overflow-hidden ${currentView === 'info' ? 'bg-blue-800 text-white font-semibold' : 'text-blue-200 hover:bg-blue-800/50 hover:text-white'}`}
          title="Acerca del Modelo"
        >
          <Info size={22} className="min-w-5.5" />
          {isOpen && <span className="ml-3 whitespace-nowrap">Info del Proyecto</span>}
        </button>
      </div>

      <div className="mt-auto p-4 border-t border-blue-800 flex items-center justify-center">
        {isOpen ? (
          <div className="text-xs text-blue-300 whitespace-nowrap text-center">
            <a
              href="https://github.com/JhandryChimbo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors duration-200"
            >
              @JhandryChimbo
            </a>
          </div>
        ) : (
          <div className="text-xs text-blue-300">v1.0</div>
        )}
      </div>
    </div>
  );
}