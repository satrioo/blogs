<script setup lang="ts">
import { getPosts } from "@/api/posts";
import type { iArticle, iBlogPost } from "@/types/article";

const allPosts = ref<iArticle[]>([]);
const filteredPosts = ref<iArticle[]>([]);
const page = ref(1);
const perPage = 10;
const loading = ref(true);
const search = ref("");

const Posts = useCookie<iBlogPost[]>("Posts", {
  default: () => [],
});

const formatPost = (post: iArticle) => ({
  title: post.title || "No Title",
  body: post.body || "No Content",
  id: post.id,
});

const formattedFilteredPosts = computed(() => {
  return filteredPosts.value.map((post) => formatPost(post));
});

const allCombinedPosts = computed(() => {
  return [...(Posts.value as unknown as iArticle[]), ...allPosts.value];
});

const currentPagePosts = computed(() => {
  const start = (page.value - 1) * perPage;
  const end = start + perPage;
  return formattedFilteredPosts.value.slice(start, end);
});

const handleSearch = () => {
  const keyword = search.value.trim().toLowerCase();
  if (!keyword) {
    filteredPosts.value = [...allCombinedPosts.value];
  } else {
    filteredPosts.value = allCombinedPosts.value.filter(
      (post) =>
        post.title?.toLowerCase().includes(keyword) ||
        post.body?.toLowerCase().includes(keyword)
    );
  }
  page.value = 1;
};

const resetSearch = () => {
  search.value = "";
  handleSearch();
};

onMounted(async () => {
  try {
    const data = await getPosts();
    allPosts.value = data ?? [];
    filteredPosts.value = [...allCombinedPosts.value];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="gap-6 py-12 px-4 max-w-7xl mx-auto">
    <div class="text-center">
      <ArticleModal title="Create New Article">
        <UButton class="w-62" type="submit" color="primary" block>
          Create New Article
        </UButton>
      </ArticleModal>
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
        <UButton
          v-if="search.length > 0"
          class="w-10"
          block
          type="submit"
          color="error"
          @click="resetSearch"
        >
          X
        </UButton>
        <UButton
          class="w-62"
          block
          type="submit"
          color="secondary"
          @click="handleSearch"
        >
          Search
        </UButton>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center items-center h-50 flex-wrap flex-col gap-6">
      Loading...
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
  </div>
</template>
