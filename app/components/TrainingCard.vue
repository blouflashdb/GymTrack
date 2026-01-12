<script setup lang="ts">
import type { Training } from '~/types'

import { DateFormatter, parseDate } from '@internationalized/date'

const { training, id } = defineProps<{
  training: Training
  id: string
}>()

const { deleteTraining } = useTrainings()

const isConfirming = ref(false)

const exercisesArray = computed(() => Object.values(training.exercises))

const totalSets = computed(() => {
  return exercisesArray.value.reduce((acc, ex) => acc + Object.values(ex.sets).length, 0)
})

const formatter = new DateFormatter('en-US', {
  dateStyle: 'full',
})

const trainingDate = computed(() => {
  return formatter.format(parseDate(training.date).toDate('UTC'))
})
</script>

<template>
  <UCard>
    <div class="flex justify-between items-start">
      <div>
        <h3 class="text-lg font-semibold text-primary">
          {{ trainingDate }}
        </h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {{ exercisesArray.length }} Exercises · {{ totalSets }} Sets
        </p>
        <div class="flex flex-wrap gap-2 mt-3">
          <UBadge
            v-for="(exercise, exerciseId) in training.exercises"
            :key="exerciseId"
            color="neutral"
            variant="subtle"
            size="xs"
          >
            {{ exercise.name }}
          </UBadge>
          <UBadge
            v-if="exercisesArray.length > 3"
            color="neutral"
            variant="subtle"
            size="xs"
          >
            +{{ exercisesArray.length - 3 }} more
          </UBadge>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton
          v-if="!isConfirming"
          icon="i-heroicons-pencil-square"
          variant="ghost"
          color="neutral"
          :to="`/trainings/${id}/edit`"
        />

        <div v-if="isConfirming" class="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 rounded-lg p-1">
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="neutral"
            size="xs"
            @click="isConfirming = false"
          />
          <UButton
            icon="i-heroicons-trash"
            variant="solid"
            color="error"
            size="xs"
            label="Delete?"
            @click="deleteTraining(id)"
          />
        </div>
        <UButton
          v-else
          icon="i-heroicons-trash"
          variant="ghost"
          color="error"
          @click="isConfirming = true"
        />
      </div>
    </div>
  </UCard>
</template>
