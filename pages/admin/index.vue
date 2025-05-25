<script setup lang="ts">
import { getPosts } from "@/api/posts";
import type { iArticle } from "@/types/article";

const allPosts = ref<iArticle[]>([]);
const filteredPosts = ref<iArticle[]>([]); // hasil filter
const page = ref(1);
const perPage = 10;
const loading = ref(true);
const search = ref("");
const router = useRouter()
const showDialog = ref(false)

const formatPost = (post: iArticle) => ({
  title: post.title || "No Title",
  body: post.body || "No Content",
  id: post.id, // kalau ada, atau field lain yang mau dipakai
});

const formattedFilteredPosts = computed(() => {
  return filteredPosts.value.map(({ userId, ...post }) => formatPost(post));
});

const currentPagePosts = computed(() => {
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  return formattedFilteredPosts.value.slice(start, end);
});

const handleSearch = () => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) {
    // Jika kosong, tampilkan semua
    filteredPosts.value = [...allPosts.value];
  } else {
    filteredPosts.value = allPosts.value.filter(post =>
      (post.title?.toLowerCase().includes(keyword)) || 
      (post.body?.toLowerCase().includes(keyword))
    );
  }
  page.value = 1; // reset page ke 1 tiap kali search
};

onMounted(async () => {
  try {
    const data = await getPosts();
    allPosts.value = data ?? [];
    filteredPosts.value = [...allPosts.value]; // awalnya semua post ditampilkan
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="gap-6 py-12 px-4 max-w-7xl mx-auto">
    <div class="text-center ">
      <UButton class="w-62" type="submit" color="primary" block @click="showDialog = true"> Create New Article </UButton>
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
        Search Article
      </label>
      <div class="flex gap-2">
        <UInput
          id="email"
          v-model="search"
          type="text"
          placeholder="input title..."
          class="w-full"
          @keydown.enter="handleSearch"
        />
        <UButton class="w-62" @click="handleSearch" type="submit" color="secondary" block> Search </UButton>
      </div>
    </div>
    <div v-if="loading">Loading...</div>
    <template v-else>
      <UTable :data="currentPagePosts" class="flex-1" />

      <div class="mt-4 flex justify-center">
        <UPagination
          v-model:page="page"
          :page-count="Math.ceil(filteredPosts.length / perPage)"
          :total="filteredPosts.length"
          :page-size="perPage"
          class="mx-auto mb-4"
        />
      </div>
    </template>

    <ArticleModal v-model="showDialog" />
  </div>
</template>
