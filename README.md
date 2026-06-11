# Cardio Risk API 🫀

Sistema integral de predicción de riesgo cardiovascular con inteligencia artificial explicable (XAI). Combina un modelo de machine learning de alta precisión con una interfaz web moderna para análisis clínico de pacientes.

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Características Principales](#características-principales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Setup](#instalación-y-setup)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Reference](#api-reference)
- [Explicabilidad (SHAP)](#explicabilidad-shap)
- [Contribución](#contribución)

---

## 📖 Descripción General

**Cardio Risk API** es una plataforma clínica diseñada para predecir el riesgo cardiovascular de pacientes mediante algoritmos de machine learning. Utiliza un modelo XGBoost entrenado con datos clínicos para proporcionar predicciones precisas y, más importante, **explicables**.

La solución combina:
- **Backend robusto** (FastAPI): API REST para inferencias
- **Frontend intuitivo** (React + TypeScript): Dashboard interactivo con visualizaciones
- **IA Explicable** (SHAP): Visualización de factores de riesgo individuales
- **Modelo predictivo**: XGBoost con feature engineering avanzado

---

## ✨ Características Principales

### 1. **Predicción de Riesgo Cardiovascular**
   - Clasificación binaria con probabilidad de riesgo
   - Umbral clínico configurable (por defecto: 0.380)
   - Basado en 11 variables clínicas iniciales

### 2. **IA Explicable (XAI)**
   - Valores SHAP para interpretar predicciones
   - Ranking de factores de riesgo más impactantes
   - Visualización de top 5 factores + otros

### 3. **Feature Engineering Avanzado**
   - **22 características derivadas** incluyendo:
     - IMC y categorización
     - Presión arterial media y ratios
     - Interacciones (IMC/Edad, Presión/IMC, Colesterol/Glucosa)
     - Puntuación de hábitos de vida
     - Grupos de edad categorizados

### 4. **Dashboard Interactivo**
   - Formulario intuitivo para entrada de datos del paciente
   - Gráficos de barras de factores de riesgo
   - Visualización de resultados clínicos
   - Exportación a PDF de reportes

### 5. **CORS Habilitado**
   - Comunicación fluida entre frontend y backend
   - Configurado para desarrollo y producción

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  FRONTEND (React + TypeScript)                                   │
│  ├─ Dashboard: Visualización de resultados                       │
│  ├─ PatientForm: Entrada de datos clínicos                       │
│  ├─ RiskResults: Presentación de predicciones                    │
│  ├─ ModelView: Explicabilidad SHAP                               │
│  └─ EdaView: Análisis exploratorio de datos                      │
│                                                                   │
│       ↓ HTTP/JSON (Axios/Fetch)                                 │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ BACKEND (FastAPI)                                            │ │
│  ├─ Endpoint POST /predict                                      │ │
│  │  ├─ Validación de entrada (Pydantic)                        │ │
│  │  ├─ Feature Engineering                                      │ │
│  │  ├─ Escalado de características                              │ │
│  │  └─ Inferencia + SHAP                                        │ │
│  │                                                              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│       ↓                                                            │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ MODELOS & ARTEFACTOS                                        │ │
│  ├─ best_model_XGB.joblib: Modelo XGBoost entrenado           │ │
│  ├─ scaler.joblib: StandardScaler para normalización           │ │
│  └─ TreeExplainer (SHAP): Explicabilidad                       │ │
│                                                                   │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo de Datos

1. **Entrada**: Usuario ingresa datos del paciente en el formulario
2. **Validación**: Pydantic valida tipos y rangos de datos
3. **Feature Engineering**: Se generan 22 características derivadas
4. **Normalización**: StandardScaler prepara datos para el modelo
5. **Predicción**: XGBoost genera probabilidad de riesgo
6. **Explicabilidad**: SHAP calcula impacto de cada variable
7. **Respuesta**: JSON con predicción, probabilidad y factores principales

---

## ⚙️ Requisitos Previos

### Sistema
- **Python**: 3.9 o superior
- **Node.js**: 18 o superior (para frontend)
- **npm** o **yarn**: Gestor de paquetes

### Tecnologías
- FastAPI
- XGBoost
- SHAP
- React 19+
- TypeScript
- Tailwind CSS

---

## 🚀 Instalación y Setup

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/cardio-risk-api.git
cd cardio-risk-api
```

### 2. Setup del Backend

#### 2.1 Crear Entorno Virtual

```bash
cd backend
python -m venv venv

# En Windows
venv\Scripts\activate

# En macOS/Linux
source venv/bin/activate
```

#### 2.2 Instalar Dependencias

```bash
pip install -r requirements.txt
```

**Dependencias principales:**
- `fastapi`: Framework web
- `uvicorn`: Servidor ASGI
- `xgboost`: Modelo de predicción
- `shap`: Explicabilidad
- `pandas`, `numpy`: Procesamiento de datos
- `scikit-learn`: Utilidades de ML
- `joblib`: Serialización de modelos

#### 2.3 Verificar Modelos

Asegúrate de que los artefactos del modelo existan:
```bash
ls model/
# Debería mostrar:
# - best_model_XGB.joblib
# - scaler.joblib
```

### 3. Setup del Frontend

#### 3.1 Instalar Dependencias

```bash
cd ../frontend
npm install
```

#### 3.2 Configurar URL del Backend

En el archivo de configuración del frontend, asegurate de que la URL de la API sea correcta:
```typescript
// Típicamente http://localhost:8000
```

---

## 🎯 Uso

### Opción A: Ejecutar Localmente

#### Terminal 1 - Backend

```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en: **http://localhost:8000**

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en: **http://localhost:5173** (puerto por defecto de Vite)

### Opción B: Compilar para Producción

#### Backend
```bash
# No requiere compilación, pero en producción usar:
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### Frontend
```bash
npm run build
# Genera carpeta 'dist/' lista para desplegar
```

---

## 📁 Estructura del Proyecto

```
cardio-risk-api/
│
├── backend/                          # API Backend
│   ├── app/
│   │   ├── main.py                   # Aplicación FastAPI principal
│   │   │   ├── PacienteInput        # Modelo Pydantic de entrada
│   │   │   ├── /predict             # Endpoint principal
│   │   │   └── categorize_hypertension()
│   │   │
│   │   └── schemas.py                # Esquemas Pydantic (actualmente vacío)
│   │
│   ├── model/
│   │   ├── best_model_XGB.joblib     # Modelo XGBoost entrenado
│   │   └── scaler.joblib             # StandardScaler serializado
│   │
│   ├── requirements.txt               # Dependencias Python
│   └── venv/                         # Entorno virtual (generado)
│
├── frontend/                         # App React
│   ├── src/
│   │   ├── main.tsx                  # Punto de entrada
│   │   ├── App.tsx                   # Componente raíz
│   │   ├── types.ts                  # Tipos TypeScript
│   │   │
│   │   └── components/
│   │       ├── Dashboard.tsx          # Vista principal
│   │       ├── PatientForm.tsx        # Formulario entrada
│   │       ├── RiskResults.tsx        # Resultados predicción
│   │       ├── ModelView.tsx          # Visualización SHAP
│   │       ├── EdaView.tsx            # Análisis exploratorio
│   │       ├── ProjectInfo.tsx        # Información del proyecto
│   │       └── Sidebar.tsx            # Navegación lateral
│   │
│   ├── public/                       # Assets estáticos
│   ├── index.html                    # HTML principal
│   ├── vite.config.ts                # Configuración Vite
│   ├── tsconfig.json                 # Configuración TypeScript
│   ├── package.json                  # Dependencias npm
│   └── eslint.config.js              # Configuración linter
│
└── README.md                         # Este archivo
```

---

## 🔌 API Reference

### Endpoint: POST /predict

Realiza la predicción de riesgo cardiovascular para un paciente.

#### Request

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "edad_dias": 18250,
    "gender": 1,
    "altura_cm": 165,
    "peso_kg": 70,
    "sistolica": 120,
    "diastolica": 80,
    "cholesterol": 1,
    "gluc": 1,
    "smoke": 0,
    "alco": 0,
    "active": 1
  }'
```

#### Input Model (PacienteInput)

| Campo | Tipo | Descripción | Rango |
|-------|------|-------------|-------|
| `edad_dias` | int | Edad del paciente en días | > 0 |
| `gender` | int | Género | 1 (Mujer), 2 (Hombre) |
| `altura_cm` | float | Altura en centímetros | > 0 |
| `peso_kg` | float | Peso en kilogramos | > 0 |
| `sistolica` | int | Presión arterial sistólica | > 0 |
| `diastolica` | int | Presión arterial diastólica | > 0 |
| `cholesterol` | int | Nivel de colesterol | 1, 2, 3 |
| `gluc` | int | Nivel de glucosa | 1, 2, 3 |
| `smoke` | int | Tabaquismo | 0 (No), 1 (Sí) |
| `alco` | int | Consumo de alcohol | 0 (No), 1 (Sí) |
| `active` | int | Actividad física | 0 (No), 1 (Sí) |

#### Response

```json
{
  "probabilidad_riesgo": 0.425,
  "clasificacion": 1,
  "mensajes": ["Riesgo moderado detectado"],
  "factores_principales": [
    {
      "name": "Edad (Años)",
      "value": 28.5
    },
    {
      "name": "Presión Sistólica",
      "value": 22.3
    },
    {
      "name": "IMC al Cuadrado",
      "value": 18.7
    },
    {
      "name": "Grupo Edad",
      "value": 15.2
    },
    {
      "name": "Otros Factores",
      "value": 15.3,
      "detalle": "Peso, Glucosa, Colesterol..."
    }
  ]
}
```

#### Status Codes

- `200 OK`: Predicción exitosa
- `422 Unprocessable Entity`: Validación fallida de entrada
- `500 Internal Server Error`: Error en servidor

---

## 🧠 Explicabilidad (SHAP)

### ¿Cómo funciona?

1. **TreeExplainer**: Utiliza los árboles internos del modelo XGBoost
2. **Valores SHAP**: Calcula la contribución de cada variable a la predicción
3. **Ranking**: Las variables se ordenan por impacto absoluto
4. **Visualización**: Top 5 factores + agregación de otros

### Ejemplo de Interpretación

```
Paciente con riesgo: 42.5%

Factores más importantes:
1. Edad (Años): 28.5% ↑ (Aumenta riesgo)
2. Presión Sistólica: 22.3% ↑
3. IMC al Cuadrado: 18.7% ↑
4. Grupo Edad: 15.2% ↑
5. Otros Factores: 15.3%
```

Este desglose permite al clínico entender **por qué** el modelo predice cierto riesgo.

---

## 🔧 Feature Engineering Detallado

El backend genera automáticamente 22 características a partir de 11 variables clínicas:

### Variables Base (11)
- Edad, Género, Altura, Peso
- Presión Sistólica, Presión Diastólica
- Colesterol, Glucosa
- Tabaquismo, Alcohol, Actividad Física

### Variables Derivadas (11 adicionales)

| Variable Derivada | Cálculo | Propósito |
|------------------|---------|-----------|
| IMC | peso / (altura/100)² | Categorización de peso |
| Presión de Pulso | sistólica - diastólica | Diferencial cardiovascular |
| Presión Media (MAP) | (sistólica + 2×diastólica)/3 | Presión promedio |
| Ratio Presión | pulso / sistólica | Elasticidad vascular |
| Log(Sistólica) | log(sistólica) | No-linealidad |
| Ratio Col/Gluc | colesterol / glucosa | Balance lipídico-glucémico |
| Interacción IMC/Edad | IMC × edad / 100 | Efecto combinado |
| Interacción Presión/IMC | MAP × IMC / 100 | Efecto hemodinámico |
| Interacción Col/Gluc | colesterol × glucosa | Efecto combinado |
| Puntuación Hábitos | (tabaco×2 + alcohol - actividad×1.5) | Score comportamental |
| Factores Acumulados | Suma de factores de riesgo | Carga multifactorial |

---

## 🌐 Configuración de CORS

**Desarrollo:**
```python
allow_origins=["*"]  # Acepta cualquier origen
```

**Producción (Recomendado):**
```python
allow_origins=["https://tudominio.com"]  # Solo tu frontend
```

Editar en `backend/app/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tudominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 📊 Umbrales Clínicos

El modelo utiliza un **umbral de riesgo de 0.380** (38%) para clasificación:

- **Riesgo Bajo**: Probabilidad < 38%
- **Riesgo Alto**: Probabilidad ≥ 38%

Configurable en `backend/app/main.py`:
```python
UMBRAL_CLINICO = 0.380
```

---

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit cambios: `git commit -m "Add mi-feature"`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

---

## 📝 Notas Importantes

### Ambiente de Desarrollo vs. Producción

| Aspecto | Desarrollo | Producción |
|--------|------------|-----------|
| CORS | `["*"]` | Específico |
| Reload | `--reload` | Sin reload |
| Host | `localhost` | `0.0.0.0` |
| Debug | Activado | Desactivado |

### Modelo XGBoost

- **Entrenado con**: Datos clínicos de ~70,000 pacientes
- **Variables**: 22 características (después del feature engineering)
- **Métrica principal**: AUC-ROC
- **Interpretabilidad**: Mediante SHAP TreeExplainer

---

## 🆘 Troubleshooting

### "ModuleNotFoundError: No module named 'fastapi'"
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
```

### "Error al cargar artefactos"
Verifica que `best_model_XGB.joblib` y `scaler.joblib` existan en `backend/model/`

### Frontend no se conecta al backend
Comprueba que:
- Backend está corriendo en `http://localhost:8000`
- CORS está configurado correctamente
- No hay firewall bloqueando conexiones

---

## 👨‍💻 Autor

Jhandry Santiago Chimbo Rivera
---

**Última actualización**: Junio 2026
