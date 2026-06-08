import React, { useRef, useState } from 'react';
import type { FormData } from '../types';
import { FileDown, UploadCloud, Download, X } from 'lucide-react';

interface PatientFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  onExcelImport: (file: File) => void;
  onDownloadTemplate: () => void;
}

export default function PatientForm({ formData, onChange, onSubmit, isLoading, onExcelImport, onDownloadTemplate }: PatientFormProps) {
  // Estados para controlar la ventana modal y el "Drag & Drop"
  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejadores de Drag & Drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      onExcelImport(file);
      setShowModal(false); // Cierra el modal tras importar
    }
  };

  // Manejador del botón tradicional de seleccionar archivo
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onExcelImport(file);
      setShowModal(false); // Cierra el modal tras importar
      e.target.value = ''; // Resetea el input
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6 relative">
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold text-slate-800">Historia Clínica</h2>
          
          {/* Botón que ahora abre la ventana emergente */}
          <button 
            type="button" 
            onClick={() => setShowModal(true)} 
            className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors shadow-sm"
          >
            <FileDown size={16} /> Cargar Paciente
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-4">
          {/* 1. Demografía */}
          <div>
            <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 bg-blue-50 p-1.5 rounded">1. Demografía</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">F. Nacimiento</label>
                <input required type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={onChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Género</label>
                <select name="gender" value={formData.gender} onChange={onChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="1">Mujer (1)</option>
                  <option value="2">Hombre (2)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Altura (cm)</label>
                <input required type="number" step="0.1" name="altura_cm" value={formData.altura_cm} onChange={onChange} placeholder="170" className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Peso (kg)</label>
                <input required type="number" step="0.1" name="peso_kg" value={formData.peso_kg} onChange={onChange} placeholder="75.5" className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
          </div>

          {/* 2. Signos Vitales */}
          <div>
            <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 bg-blue-50 p-1.5 rounded">2. Signos Vitales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">P. Sistólica</label>
                <input required type="number" name="sistolica" value={formData.sistolica} onChange={onChange} placeholder="120" className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">P. Diastólica</label>
                <input required type="number" name="diastolica" value={formData.diastolica} onChange={onChange} placeholder="80" className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Colesterol</label>
                <select name="cholesterol" value={formData.cholesterol} onChange={onChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="1">Normal</option>
                  <option value="2">Alto</option>
                  <option value="3">Muy Alto</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Glucosa</label>
                <select name="gluc" value={formData.gluc} onChange={onChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="1">Normal</option>
                  <option value="2">Alta</option>
                  <option value="3">Muy Alta</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Estilo de Vida */}
          <div>
            <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-2 bg-blue-50 p-1.5 rounded">3. Estilo de Vida</h3>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" name="smoke" checked={formData.smoke === '1'} onChange={(e) => onChange({ target: { name: 'smoke', value: e.target.checked ? '1' : '0' } } as any)} className="w-4 h-4 text-blue-600" /> Fuma
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" name="alco" checked={formData.alco === '1'} onChange={(e) => onChange({ target: { name: 'alco', value: e.target.checked ? '1' : '0' } } as any)} className="w-4 h-4 text-blue-600" /> Alcohol
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input type="checkbox" name="active" checked={formData.active === '1'} onChange={(e) => onChange({ target: { name: 'active', value: e.target.checked ? '1' : '0' } } as any)} className="w-4 h-4 text-blue-600" /> Activo
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full mt-2 font-bold py-2.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2
              ${isLoading ? 'bg-blue-400 cursor-not-allowed text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Procesando IA...
              </>
            ) : (
              'Ejecutar Análisis'
            )}
          </button>
        </form>
      </div>

      {/* VENTANA EMERGENTE (MODAL) DE IMPORTACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-bold text-slate-800 mb-1">Importar Registro Clínico</h3>
            <p className="text-sm text-slate-500 mb-6">Carga un archivo de Excel para autocompletar la historia clínica del paciente.</p>

            {/* Zona de Arrastrar y Soltar */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'}`}
            >
              <UploadCloud className={`mx-auto mb-3 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} size={40} />
              <p className="text-sm font-semibold text-slate-700">Haz clic o arrastra tu archivo aquí</p>
              <p className="text-xs text-slate-500 mt-1">Soporta .xlsx y .xls</p>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept=".xlsx, .xls" 
                className="hidden" 
              />
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500 mb-3">¿No tienes el formato correcto?</p>
              <button 
                onClick={onDownloadTemplate}
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 py-2.5 rounded-lg transition-colors border border-blue-200"
              >
                <Download size={16} /> Descargar Plantilla Excel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}