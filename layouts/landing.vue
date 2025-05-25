<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");

const toggleDarkMode = () => {
  colorMode.preference = isDark.value ? "light" : "dark";
};
</script>

<template>
  <div>
    <UContainer class="flex items-center justify-between py-4">
      <UButton icon="i-heroicons-home" to="/" variant="ghost" label="Home" />

      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        variant="ghost"
        @click="toggleDarkMode"
      />
    </UContainer>
    <main><slot /></main>
  </div>
</template>
