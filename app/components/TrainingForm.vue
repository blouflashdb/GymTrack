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
  training.value.exercises[id] = {
    name: '',
    sets: {},
  }
}

function removeExercise(id: string) {
  delete training.value.exercises[id]
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center gap-4 mb-6">
      <UButton
        to="/"
        icon="i-heroicons-arrow-left"
        variant="ghost"
        color="neutral"
      />
      <h2 class="text-2xl font-bold">
        {{ title }}
      </h2>
    </div>

    <UForm :state="training" @submit="emit('submit')">
      <div class="space-y-6">
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

        <div class="flex justify-end gap-4">
          <UButton
            to="/"
            label="Cancel"
            variant="ghost"
            color="neutral"
          />
          <UButton
            :label="submitLabel"
            color="primary"
            size="lg"
            type="submit"
          />
        </div>
      </div>
    </UForm>
  </div>
</template>
