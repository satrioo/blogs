<!-- 
<script setup lang="ts">
const model = defineModel()

defineShortcuts({
  o: () => open.value = !open.value
})
</script>

<template>
  {{ model }}
  <UModal
    v-model="model"
    title="Modal with description"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #body>
      <Placeholder class="h-48" />
    </template>
  </UModal>
</template> -->

<script setup lang="ts">
import { ref, watch } from 'vue'

const open = ref(false)

watch(open, (val) => {
  console.log('Modal open changed:', val)
})
</script>

<template>
  <UButton label="Open Modal" @click="open = true" />

  <UModal
    v-model="open"
    title="Modal with description"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <!-- ✅ content goes into body slot, but don't forget #footer or internal close -->
    <template #body>
      <p class="text-red-500 cursor-pointer" @click="open = false">Click to close</p>
      <Placeholder class="h-48" />
    </template>

    <!-- ✅ optional footer if needed -->
    <template #footer>
      <UButton label="Close" @click="open = false" />
    </template>
  </UModal>
</template>