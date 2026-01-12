<script setup lang="ts">
const { trainings, trainingCount } = useTrainings()
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
        GymTrack
      </h1>
      <UButton
        to="/trainings/new"
        icon="i-heroicons-plus"
        size="lg"
        color="primary"
      >
        Start New Training
      </UButton>
    </div>

    <div v-if="!trainingCount" class="text-center py-12">
      <UIcon
        name="i-heroicons-clipboard-document-list"
        class="text-6xl text-gray-300 dark:text-gray-600 mb-4"
      />
      <h3 class="text-xl font-medium text-gray-900 dark:text-white">
        No trainings yet
      </h3>
      <p class="text-gray-500 dark:text-gray-400 mt-2 mb-6">
        Start tracking your progress by adding a new training session.
      </p>
      <UButton
        to="/trainings/new"
        icon="i-heroicons-plus"
        size="lg"
        variant="soft"
      >
        Start Your First Training
      </UButton>
    </div>

    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <TrainingCard
        v-for="(training, id) in trainings"
        :id="id"
        :key="id"
        :training="training"
      />
    </div>
  </div>
</template>
