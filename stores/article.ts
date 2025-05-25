import { defineStore } from 'pinia'
import type { iArticle } from '@/types/article'
import { ref } from 'vue'

export const useArticleStore = defineStore('article', () => {
  const cachedPosts = ref<iArticle[]>([])
  const fetched = ref(false)

  function setPosts(posts: iArticle[]) {
    cachedPosts.value = posts
    fetched.value = true
  }

  return {
    cachedPosts,
    fetched,
    setPosts
  }
})