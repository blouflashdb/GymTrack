<script setup lang="ts">
import type { Exercise } from '~/types'

defineEmits<{
  remove: []
}>()

const exercise = defineModel<Exercise>({ required: true })

const isConfirmingRemove = ref(false)

const { allExerciseNames } = useTrainings()
const items = ref<string[]>([])

onMounted(() => {
  items.value = allExerciseNames.value
})

function onCreate(item: string) {
  items.value.push(item)

  exercise.value.name = item
}

function addSet() {
  const id = crypto.randomUUID()
  exercise.value.sets[id] = {
    reps: 0,
    weight: Object.values(exercise.value.sets).at(0)?.weight ?? 0,
  }
}

function removeSet(id: string) {
  delete exercise.value.sets[id]
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-end gap-2">
        <UFormField label="Exercise Name" class="flex-1">
          <USelectMenu v-model="exercise.name" create-item :items="items" class="w-full" placeholder="Select or create exercise" @create="onCreate" />
        </UFormField>

        <div v-if="isConfirmingRemove" class="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 rounded-lg p-1">
          <UButton
            icon="i-heroicons-x-mark"
            variant="ghost"
            color="neutral"
            size="xs"
            aria-label="Cancel remove"
            @click="isConfirmingRemove = false"
          />
          <UButton
            icon="i-heroicons-trash"
            variant="solid"
            color="error"
            size="xs"
            aria-label="Confirm remove"
            label="Remove?"
            @click="$emit('remove')"
          />
        </div>
        <UButton
          v-else
          icon="i-heroicons-trash"
          color="error"
          variant="ghost"
          aria-label="Remove"
          @click="isConfirmingRemove = true"
        />
      </div>
    </template>

    <div class="space-y-2">
      <SetInput
        v-for="(_set, setId, index) in exercise.sets"
        :key="setId"
        v-model:set="exercise.sets[setId]!"
        :index="index"
        @remove="removeSet(setId)"
      />
      <UEmpty v-if="Object.keys(exercise.sets).length === 0" title="No sets added yet." />
      <UButton
        label="Add Set"
        icon="i-heroicons-plus"
        variant="soft"
        size="sm"
        block
        class="mt-2"
        @click="addSet"
      />
    </div>
  </UCard>
</template>
