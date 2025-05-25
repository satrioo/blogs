<script setup lang="ts">
import type { iArticle } from "@/types/article";
import { getPosts } from "@/api/posts";

definePageMeta({
  layout: "landing",
});

const posts = ref<iArticle[]>([]);
const currentPagePosts = ref<iArticle[]>([]);
const page = ref(1);
const perPage = 12;
const loading = ref(true);

onMounted(async () => {
  await getPosts()
    .then((data) => {
      posts.value = data ?? [];
      updateCurrentPagePosts();
    })
    .finally(() => {
      loading.value = false;
    });
});

watch(page, () => {
  updateCurrentPagePosts();
});

function updateCurrentPagePosts() {
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  currentPagePosts.value = posts.value.slice(start, end);
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-4xl font-bold mb-4 mx-auto">Latest News</h1>

    <div
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12 px-4 max-w-7xl mx-auto"
    >
      <SkeletonCard v-for="item in 9" v-show="loading" :key="item" />

      <ArticleCard
        v-for="post in currentPagePosts"
        :key="post.id"
        :data="post"
      />
    </div>

    <UPagination
      v-model:page="page"
      :page-count="1"
      :total="posts.length"
      :page-size="perPage"
      class="mx-auto mb-4"
    />
  </div>
</template>
