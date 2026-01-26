<script setup lang="ts">
const isMounted = useMounted()
</script>

<template>
  <AppLoading v-if="!isMounted" />
  <slot v-else />
</template>
