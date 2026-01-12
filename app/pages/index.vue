<script setup lang="ts">
const { trainings, trainingCount } = useTrainings()

const isMounted = useMounted()
</script>

<template>
  <div>
    <AppLoading v-if="!isMounted" />
    <div v-else class="space-y-4">
      <div class="flex items-center justify-end">
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
          v-for="(training, id) in trainings"
          :id="id"
          :key="id"
          :training="training"
        />
      </div>
    </div>
  </div>
</template>
