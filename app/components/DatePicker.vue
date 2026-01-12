<script setup lang="ts">
import { parseDate } from '@internationalized/date'

const inputDate = useTemplateRef('inputDate')

const modelValue = defineModel<string>({ required: true })

const date = computed({
  get() {
    return parseDate(modelValue.value)
  },
  set(newValue) {
    modelValue.value = newValue.toString()
  },
})
</script>

<template>
  <UInputDate ref="inputDate" v-model="date">
    <template #trailing>
      <UPopover :reference="inputDate?.inputsRef[3]?.$el">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-heroicons-calendar"
          aria-label="Select a date"
          class="px-0"
        />

        <template #content>
          <UCalendar v-model="date" class="p-2" />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
