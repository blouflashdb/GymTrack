<script setup lang="ts">
import type { Training } from '~/types'

defineRouteRules({
  robots: false,
})

const route = useRoute()
const { getTraining, updateTraining } = useTrainings()

const trainingId = route.params.id as string
const training = ref<Training | undefined>()

onMounted(() => {
  training.value = structuredClone(toRaw(getTraining(trainingId)))
})

async function save() {
  if (!training.value)
    return
  updateTraining(trainingId, training.value)
  await navigateTo('/')
}
</script>

<template>
  <AppPageLoading>
    <TrainingForm
      v-if="training"
      v-model="training"
      title="Edit Training"
      submit-label="Save Changes"
      @submit="save"
    />
    <AppLoading v-else />
  </AppPageLoading>
</template>
