<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({
      id: '',
      title: '',
      body: ''
    })
  },
});
</script>

<template>
  <UCard class="hover:shadow-lg transition">
    <h3 class="text-xl font-semibold mb-2 line-clamp-2 h-15">{{ data.title }}</h3>
    <p class="text-gray-600 line-clamp-1">{{ data.body }}</p>
    <template #footer>
      <UButton size="sm" variant="ghost" color="primary" @click="$router.push(`/detail-article/${data.id}`)">
        Read More
      </UButton>
    </template>
  </UCard>
</template>
