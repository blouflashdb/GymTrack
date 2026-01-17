<script setup lang="ts">
useSeoMeta({
  title: 'Progress Charts',
  description: 'Visualize your gym progress with interactive exercise charts. Track strength gains, monitor workout performance over time, and analyze your training data to optimize your fitness results.',
})
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">
      Progress Chart
    </h1>
    <ExercisesLineChart />
  </div>
</template>
