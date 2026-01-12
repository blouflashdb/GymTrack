export interface Set {
  reps: number
  weight: number
}

export interface Exercise {
  name: string
  sets: Record<string, Set>
}

export interface Training {
  date: string // ISO_8601 string
  exercises: Record<string, Exercise>
}
