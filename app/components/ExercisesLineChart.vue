<script lang="ts" setup>
import { DateFormatter, getLocalTimeZone, parseDate, today } from '@internationalized/date'

const { trainings, allExerciseNames } = useTrainings()

const isMounted = useMounted()
const selectedExercises = ref<string[]>([])
const inputDate = useTemplateRef('inputDate')

const now = today(getLocalTimeZone())

const dateRange = shallowRef({
  start: now.subtract({ months: 3 }),
  end: now,
})

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
  const allKnownNames = new Set<string>()
  sortedTrainings.forEach((t) => {
    if (t.exercises) {
      Object.values(t.exercises).forEach(e => allKnownNames.add(e.name))
    }
  })

  // 3. Initialize "Running State"
  const currentValues: Record<string, number> = {}
  allKnownNames.forEach((name) => {
    currentValues[name] = 0
  })

  const startStr = dateRange.value.start.toString()
  const endStr = dateRange.value.end.toString()
  const result: any[] = []
  let hasAddedStartPoint = false

  // 4. Build the data points with date range filtering
  sortedTrainings.forEach((training) => {
    const tDate = training.date

    if (tDate > endStr)
      return

    if (tDate < startStr) {
      // Just update running state
      if (training.exercises) {
        Object.values(training.exercises).forEach((exercise) => {
          const totalForce = Object.values(exercise.sets).reduce((sum, set) => {
            return sum + (set.weight * set.reps)
          }, 0)
          currentValues[exercise.name] = totalForce
        })
      }
    }
    else {
      // Inside Range
      // If this is the first point in range, add the start point with previous state
      if (!hasAddedStartPoint) {
        result.push({
          date: startStr,
          ...currentValues, // Capture state before this training
        })
        hasAddedStartPoint = true
      }

      // Update state with current training
      if (training.exercises) {
        Object.values(training.exercises).forEach((exercise) => {
          const totalForce = Object.values(exercise.sets).reduce((sum, set) => {
            return sum + (set.weight * set.reps)
          }, 0)
          currentValues[exercise.name] = totalForce
        })
      }

      // Add the training point
      result.push({
        date: tDate,
        ...currentValues,
      })
    }
  })

  // Ensure start point exists if no trainings in range found
  if (!hasAddedStartPoint) {
    result.push({
      date: startStr,
      ...currentValues,
    })
  }

  // Extend to end date for full width step chart
  if (result.length > 0) {
    const lastPoint = result[result.length - 1]
    if (lastPoint.date < endStr) {
      result.push({
        date: endStr,
        ...currentValues,
      })
    }
  }

  return result
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
      <div class="flex flex-col sm:flex-row gap-4">
        <UFormField label="Exercises" class="flex-1">
          <USelectMenu v-model="selectedExercises" multiple :items="allExerciseNames" class="w-full" placeholder="Select exercises" />
        </UFormField>

        <UFormField label="Date Range" class="w-full sm:w-auto">
          <UInputDate ref="inputDate" v-model="dateRange" range>
            <template #trailing>
              <UPopover :reference="inputDate?.inputsRef?.[0]?.$el">
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  icon="i-heroicons-calendar-days"
                  aria-label="Select a date range"
                  class="px-0"
                />

                <template #content>
                  <UCalendar v-model="dateRange" class="p-2" :number-of-months="2" range />
                </template>
              </UPopover>
            </template>
          </UInputDate>
        </UFormField>
      </div>
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
