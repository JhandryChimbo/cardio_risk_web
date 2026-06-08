import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProjectInfo from './components/ProjectInfo';

function App() {
  // Estado para abrir/cerrar el menú (cerrado por defecto en laptops para ahorrar espacio)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Estado para controlar qué pantalla estamos viendo
  const [currentView, setCurrentView] = useState<'dashboard' | 'info'>('dashboard');

  return (
    // Estructura Flex: Menú a la izquierda, Contenido a la derecha (ocupando toda la altura)
    <div className="flex h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* El Sidebar Retráctil */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Contenedor Principal con Scroll Independiente */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Header Superior (Ya no tiene el nombre de la app, se fue al menú) */}
        <header className="bg-white border-b p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-lg font-bold text-slate-700">
            {currentView === 'dashboard' ? 'Evaluación Cardiovascular' : 'Documentación del Modelo'}
          </h1>
          <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-semibold">
            Dr. Invitado
          </span>
        </header>

        {/* Área donde se carga la vista seleccionada */}
        <main className="p-6">
          {currentView === 'dashboard' ? <Dashboard /> : <ProjectInfo />}
        </main>
        
      </div>
    </div>
  );
}

export default App;