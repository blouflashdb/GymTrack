<script setup lang="ts">
const { trainings } = useTrainings()
const toast = useToast()

const jsonInput = ref('')
const importFile = ref<File | null>(null)

// Initialize editor on mount
onMounted(() => {
  jsonInput.value = JSON.stringify(trainings.value, null, 2)
})

watch(importFile, (file) => {
  if (!file)
    return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string
      const parsed = JSON.parse(content)

      // Basic validation: Check if it looks like a record
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Invalid JSON format')
      }

      // Update store
      trainings.value = parsed
      jsonInput.value = JSON.stringify(parsed, null, 2)

      toast.add({
        title: 'Import Successful',
        description: 'Training data has been restored from file.',
        color: 'success',
      })
    }
    catch {
      toast.add({
        title: 'Import Failed',
        description: 'Failed to parse JSON file.',
        color: 'error',
      })
    }
    // Reset input
    importFile.value = null
  }
  reader.readAsText(file)
})

function downloadData() {
  const dataStr = JSON.stringify(trainings.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `gymtrack-backup-${new Date().toISOString().split('T')[0]}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function saveJson() {
  try {
    const parsed = JSON.parse(jsonInput.value)
    // Basic validation
    if (typeof parsed !== 'object' || parsed === null) {
      throw new Error('Invalid JSON format')
    }

    trainings.value = parsed
    toast.add({
      title: 'Saved',
      description: 'Training data updated manually.',
      color: 'success',
    })
  }
  catch {
    toast.add({
      title: 'Error',
      description: 'Invalid format. Please check your JSON syntax.',
      color: 'error',
    })
  }
}
</script>

<template>
  <AppPageLoading>
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold">
          Data Management
        </h1>
        <div class="flex gap-2">
          <UFileUpload
            v-model="importFile"
            accept=".json"
            variant="button"
            label="Import"
            icon="i-heroicons-arrow-up-tray"
            color="neutral"
          />
          <UButton
            icon="i-heroicons-arrow-down-tray"
            color="neutral"
            variant="outline"
            @click="downloadData"
          >
            Export
          </UButton>
        </div>
      </div>

      <UCard>
        <template #header>
          <div class="flex items-center justify-between gap-4">
            <div class="flex flex-col gap-1">
              <div class="font-medium">
                Raw Data Editor
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Directly edit your local storage data. Be careful, invalid JSON will be rejected.
              </p>
            </div>
            <UButton
              icon="i-heroicons-check"
              color="primary"
              @click="saveJson"
            >
              Save Changes
            </UButton>
          </div>
        </template>

        <UTextarea
          v-model="jsonInput"
          :rows="20"
          class="font-mono text-sm w-full"
          autoresize
        />
      </UCard>
    </div>
  </AppPageLoading>
</template>
