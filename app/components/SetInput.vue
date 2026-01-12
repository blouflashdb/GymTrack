<script setup lang="ts">
import type { Set } from '~/types'

defineProps<{
  index: number
}>()

const emit = defineEmits<{
  remove: []
}>()

const set = defineModel<Set>('set', { required: true })
</script>

<template>
  <div class="flex items-end gap-2">
    <div class="w-8 text-center text-sm text-gray-500 mb-2">
      {{ index + 1 }}
    </div>
    <UFormField label="Reps">
      <UInput
        v-model="set.reps"
        type="number"
        placeholder="Reps"
        class="w-24"
      >
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">reps</span>
        </template>
      </UInput>
    </UFormField>
    <UFormField label="Weight">
      <UInput
        v-model="set.weight"
        type="number"
        placeholder="Weight"
        class="w-24"
      >
        <template #trailing>
          <span class="text-gray-500 dark:text-gray-400 text-xs">kg</span>
        </template>
      </UInput>
    </UFormField>
    <UButton
      icon="i-heroicons-trash"
      color="error"
      variant="ghost"
      aria-label="Remove set"
      @click="emit('remove')"
    />
  </div>
</template>
