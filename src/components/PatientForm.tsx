import React from 'react';
import type { FormData } from '../types';

interface PatientFormProps {
  formData: FormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function PatientForm({ formData, onChange, onSubmit }: PatientFormProps) {
  return (
    // Reducimos el padding de p-8 a p-5 o p-6
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 md:p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 border-b pb-2">
        Historia Clínica
      </h2>
      
      {/* Reducimos el espacio vertical de space-y-6 a space-y-4 */}
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

        <button type="submit" className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md">
          Ejecutar Análisis
        </button>
      </form>
    </div>
  );
}