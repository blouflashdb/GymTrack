<script setup lang="ts">
import type { Training } from '~/types'

defineProps<{
  title: string
  submitLabel: string
}>()

const emit = defineEmits<{
  submit: []
}>()

const training = defineModel<Training>({ required: true })

function addExercise() {
  const id = crypto.randomUUID()
  training.value.exercises = {
    [id]: {
      name: '',
      sets: {},
    },
    ...training.value.exercises,
  }
}

function removeExercise(id: string) {
  delete training.value.exercises[id]
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <UForm :state="training" @submit="emit('submit')">
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <UButton
              to="/"
              icon="i-heroicons-arrow-left"
              variant="ghost"
              color="neutral"
              aria-label="Back to trainings"
            />
            <h2 class="text-2xl font-bold">
              {{ title }}
            </h2>
          </div>
          <UButton
            :label="submitLabel"
            icon="i-heroicons-check-circle"
            color="primary"
            size="lg"
            type="submit"
          />
        </div>
        <UCard>
          <template #header>
            <div class="font-semibold">
              Training Details
            </div>
          </template>
          <UFormField label="Date">
            <DatePicker v-model="training.date" />
          </UFormField>
        </UCard>

        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">
              Exercises
            </h2>
            <UButton
              label="Add Exercise"
              icon="i-heroicons-plus"
              type="button"
              @click="addExercise"
            />
          </div>

          <UEmpty
            v-if="Object.keys(training.exercises).length === 0"
            title="No exercises found"
            description="It looks like you haven't added any exercises. Add one to get started."
          />

          <div v-else class="space-y-4">
            <ExerciseForm
              v-for="(_exercise, exId) in training.exercises"
              :key="exId"
              v-model="training.exercises[exId]!"
              @remove="removeExercise(exId)"
            />
          </div>
        </div>
      </div>
    </UForm>
  </div>
</template>
