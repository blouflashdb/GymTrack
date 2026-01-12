import type { Training } from '~/types'

export function useTrainings() {
  const trainings = useLocalStorage<Record<string, Training>>('trainings', {}, {
    initOnMounted: true,
  })

  const allExerciseNames = computed(() => {
    const names = new Set<string>()
    if (!trainings.value)
      return []

    Object.values(trainings.value).forEach((training) => {
      if (training.exercises) {
        Object.values(training.exercises).forEach((exercise) => {
          if (exercise.name)
            names.add(exercise.name)
        })
      }
    })
    return Array.from(names).sort()
  })

  const trainingCount = computed(() => Object.keys(trainings.value).length)

  function addTraining(training: Training) {
    trainings.value[crypto.randomUUID()] = training
  }

  function updateTraining(id: string, updatedTraining: Training) {
    trainings.value[id] = updatedTraining
  }

  function deleteTraining(id: string) {
    delete trainings.value[id]
  }

  function getTraining(id: string) {
    return trainings.value[id]
  }

  return {
    trainings,
    trainingCount,
    allExerciseNames,
    addTraining,
    updateTraining,
    deleteTraining,
    getTraining,
  }
}
