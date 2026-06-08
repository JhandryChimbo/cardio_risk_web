export interface RiskFactor {
  name: string;
  value: number;
  color?: string;
  detalle?: string;
}

export interface RiskData {
  probabilidad: number;
  alerta: string;
  nivel: 'alto' | 'bajo';
  factores: RiskFactor[];
}

export interface FormData {
  fecha_nacimiento: string;
  gender: string;
  altura_cm: string;
  peso_kg: string;
  sistolica: string;
  diastolica: string;
  cholesterol: string;
  gluc: string;
  smoke: string;
  alco: string;
  active: string;
}