<script setup lang="ts">
const items = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Chart',
    icon: 'i-heroicons-chart-bar',
    to: '/chart',
  },
]
</script>

<template>
  <UHeader>
    <template #title>
      <h1 class="text-3xl font-bold">
        GymTrack
      </h1>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" />
    </template>
  </UHeader>
</template>
