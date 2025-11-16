export interface Ejercicio {
  nombre: string
  tipo: string
  reps: string
  peso: string
}

export interface DiaRutina {
  dia: string
  ejercicios: Ejercicio[]
}

export type TipoRutina = "full_body" | "upper_lower" | "push_pull_legs"
export type Objetivo = "fuerza" | "hipertrofia"
