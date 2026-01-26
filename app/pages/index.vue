<script setup lang="ts">
useSeoMeta({
  title: 'Your Trainings',
  description: 'View and manage your workout history with GymRat Log. Access all your training sessions, track your gym progress, and easily start new workouts to maintain your fitness routine.',
})

const { trainings, trainingCount } = useTrainings()

const sortedTrainings = computed(() => {
  return Object.entries(trainings.value)
    .sort(([, a], [, b]) => b.date.localeCompare(a.date))
})
</script>

<template>
  <AppPageLoading>
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">
          Trainings
        </h1>
        <UButton
          to="/trainings/new"
          icon="i-heroicons-plus"
          size="lg"
          color="primary"
          label="Start New Training"
        />
      </div>

      <UEmpty
        v-if="!trainingCount"
        title="No trainings found"
        description="It looks like you haven't added any trainings. Create one to get started."
      />

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TrainingCard
          v-for="[id, training] in sortedTrainings"
          :id="id"
          :key="id"
          :training="training"
        />
      </div>
    </div>
  </AppPageLoading>
</template>
