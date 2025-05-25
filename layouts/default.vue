<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore()
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

      <div>
        <UButton
          icon="i-heroicons-user"
          to="/admin"
          variant="ghost"
          label="Admin Page"
        />
        <UButton
          v-if="authStore.BlogsData.length > 0"
          icon="i-heroicons-arrow-uturn-left"
          variant="ghost"
          :label="`Logout - ${authStore.BlogsData[0].username}`"
          @click="authStore.doLogout"
        />
        <UButton
          :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
          variant="ghost"
          @click="toggleDarkMode"
        />
      </div>
    </UContainer>
    <main><slot /></main>
  </div>
</template>
