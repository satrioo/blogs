<script setup lang="ts">
import type { iArticle } from "@/types/article";
import { getDetail } from "@/api/posts";


const article = ref<iArticle | null>(null);
const loading = ref(true);
const route = useRoute();

onMounted(async () => {
  await getDetail(route.params.id as string)
    .then((data) => {
      article.value = data ?? null;
    })
    .finally(() => {
      loading.value = false;
    });
});
</script>

<template>
  <div class="flex flex-col">
    <div class="grid gap-6 py-12 px-4 w-full max-w-7xl mx-auto">
      <SkeletonCard v-for="item in 1" v-show="loading" :key="item" :detail="true" />
      <UCard v-if="!loading ">
        <h1 class="text-4xl font-bold mb-4 mx-auto">{{ article?.title }}</h1>
        <p class="text-gray-600 line-clamp-4">{{ article?.body }}</p>
        <template #footer>
          <UButton
            size="sm"
            variant="ghost"
            color="primary"
            @click="$router.push(`/`)"
          >
            Back to home page
          </UButton>
        </template>
      </UCard>
    </div>
  </div>
</template>
