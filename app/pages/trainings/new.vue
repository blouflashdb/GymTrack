<script setup lang="ts">
import type { Training } from '~/types'
import { getLocalTimeZone, today } from '@internationalized/date'

defineRouteRules({
  robots: false,
})

const { addTraining } = useTrainings()

const training = ref<Training>({
  date: today(getLocalTimeZone()).toString(),
  exercises: {},
})

async function saveTraining() {
  addTraining(training.value)
  await navigateTo('/')
}
</script>

<template>
  <AppPageLoading>
    <TrainingForm
      v-model="training"
      title="New Training"
      submit-label="Save Training"
      @submit="saveTraining"
    />
  </AppPageLoading>
</template>
