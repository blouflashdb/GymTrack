import type { Training } from '~/types'

export function useTrainings() {
  const trainings = useLocalStorage<Record<string, Training>>('trainings', {}, {
    initOnMounted: true,
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
    addTraining,
    updateTraining,
    deleteTraining,
    getTraining,
  }
}
