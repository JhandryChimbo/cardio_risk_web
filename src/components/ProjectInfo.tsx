export default function ProjectInfo() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-full flex flex-col">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">Acerca del Proyecto (v1.0)</h2>
      
      <div className="space-y-6 text-slate-600 grow overflow-y-auto">
        <section>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Objetivo Clínico</h3>
          <p>Esta herramienta predictiva fue desarrollada como parte de un trabajo de tesis de la Universidad Católica de Santiago de Guayaquil, para estimar el riesgo de padecer enfermedades cardiovasculares en pacientes. Utiliza variables antropométricas, demográficas y clínicas.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Arquitectura de Inteligencia Artificial</h3>
          <p>El núcleo predictivo utiliza un modelo <strong>XGBoost (Extreme Gradient Boosting)</strong>, el cual fue seleccionado tras comparar su rendimiento y curva ROC-AUC contra modelos como LightGBM y Random Forest.</p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Explicabilidad (SHAP)</h3>
          <p>Para garantizar la transparencia clínica (IA Explicable), el sistema incorpora valores SHAP (SHapley Additive exPlanations). Esto permite que cada predicción especifique exactamente qué peso tuvo cada variable (ej. Presión Sistólica, Colesterol) en el diagnóstico final, ayudando al médico a tomar decisiones informadas.</p>
        </section>
        
        <section>
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Versión y Créditos</h3>
          <p>Versión v1.0, Julio de 2024. Desarrollado por: Jhandry U. Tutor: [Nombre de tu tutor]. Universidad Católica de Santiago de Guayaquil.</p>
        </section>
      </div>
    </div>
  );
}