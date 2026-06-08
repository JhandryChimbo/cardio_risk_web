import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectInfo from './components/ProjectInfo';
import EdaView from './components/EdaView';
import ModelView from './components/ModelView'; // <-- Importamos la nueva vista

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Añadimos 'model' al tipo del estado de vistas
  const [currentView, setCurrentView] = useState<'dashboard' | 'info' | 'eda' | 'model'>('dashboard');

  const [doctorProfile] = useState({
    nombre: 'Dr. Invitado',
    especialidad: 'Cardiología',
    hospital: 'Hospital General Universitario'
  });

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <div className="flex-1 flex flex-col overflow-y-auto relative">
        <header className="bg-white border-b p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-slate-700">
            {currentView === 'dashboard' ? 'Evaluación Cardiovascular' : 
             currentView === 'info' ? 'Información del Proyecto' :
             currentView === 'eda' ? 'Análisis Exploratorio de Datos' :
             currentView === 'model' ? 'Validación y Rendimiento de la IA' : // <-- Título dinámico
             'Documentación del Modelo'}
          </h1>
          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-semibold">
            {doctorProfile.nombre}
          </span>
        </header>

        <main className="p-6 flex-1 h-full">
          {currentView === 'dashboard' ? <Dashboard doctorProfile={doctorProfile} /> :
           currentView === 'eda' ? <EdaView /> :
           currentView === 'model' ? <ModelView /> : // <-- Renderizado condicional
           <ProjectInfo />}
        </main>
      </div>
    </div>
  );
}

export default App;