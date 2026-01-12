<script setup lang="ts">
import type { Training } from '~/types'
import { getLocalTimeZone, today } from '@internationalized/date'

const { addTraining } = useTrainings()

const mounted = useMounted()

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
  <div>
    <TrainingForm
      v-if="mounted"
      v-model="training"
      title="New Training"
      submit-label="Save Training"
      @submit="saveTraining"
    />
    <AppLoading v-else />
  </div>
</template>
