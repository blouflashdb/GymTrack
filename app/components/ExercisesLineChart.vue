<script lang="ts" setup>
import { DateFormatter, parseDate } from '@internationalized/date'

const { trainings, allExerciseNames } = useTrainings()

const isMounted = useMounted()
const selectedExercises = ref<string[]>([])

onMounted(() => {
  selectedExercises.value = allExerciseNames.value.slice(0, 3)
})

const formatter = new DateFormatter('en-US', {
  dateStyle: 'short',
})

function stringToColor(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const c = (hash & 0x00FFFFFF).toString(16).toUpperCase()
  return `#${'00000'.substring(0, 6 - c.length)}${c}`
}

const categories = computed(() => {
  const cats: Record<string, { name: string, color: string }> = {}

  selectedExercises.value.forEach((name) => {
    cats[name] = {
      name,
      color: stringToColor(name),
    }
  })

  return cats
})

const chartData = computed(() => {
  if (!trainings.value)
    return []

  // 1. Sort trainings by date
  const sortedTrainings = Object.values(trainings.value).sort((a, b) =>
    new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  // 2. Identify ALL unique exercise names found in the entire history
  // We need this to initialize everything to 0 at the start.
  const allKnownNames = new Set<string>()
  sortedTrainings.forEach((t) => {
    if (t.exercises) {
      Object.values(t.exercises).forEach(e => allKnownNames.add(e.name))
    }
  })

  // 3. Initialize "Running State"
  // Start every exercise at 0. This handles the "backfill with 0" requirement.
  const currentValues: Record<string, number> = {}
  allKnownNames.forEach((name) => {
    currentValues[name] = 0
  })

  // 4. Build the data points
  return sortedTrainings.map((training) => {
    // Step A: Update the "Running State" with today's actual performance
    if (training.exercises) {
      Object.values(training.exercises).forEach((exercise) => {
        const totalForce = Object.values(exercise.sets).reduce((sum, set) => {
          return sum + (set.weight * set.reps)
        }, 0)

        // Update the running value for this specific exercise
        currentValues[exercise.name] = totalForce
      })
    }

    // Step B: Create the data point using the current state of ALL exercises
    // Because 'currentValues' persists, it automatically handles "Fill Forward".
    // Because it started at 0, it automatically handles "Backfill Zeros".
    return {
      date: training.date,
      ...currentValues, // Spread the current state (copying values)
    }
  })
})

function xFormatter(tick: number) {
  const dataPoint = chartData.value[tick]
  if (!dataPoint)
    return ''
  return formatter.format(parseDate(dataPoint.date).toDate('UTC'))
}
</script>

<template>
  <div>
    <AppLoading v-if="!isMounted" />
    <div v-else class="space-y-4">
      <UFormField label="Exercises">
        <USelectMenu v-model="selectedExercises" multiple :items="allExerciseNames" class="w-full" placeholder="Select exercises" />
      </UFormField>
      <LineChart
        v-if="chartData.length > 0 && selectedExercises.length > 0"
        :data="chartData"
        :categories="categories"
        :x-formatter="xFormatter"
        :y-grid-line="true"
        :x-num-ticks="5"
        y-label="Force (kg * reps)"
        :height="350"
        :curve-type="CurveType.Step"
      />
      <UEmpty
        v-else
        title="No data to display"
        description="Please add trainings with exercises and select exercises to see the chart."
      />
    </div>
  </div>
</template>
