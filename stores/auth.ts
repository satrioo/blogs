import { defineStore } from 'pinia'
import type { iListUser } from '@/types/auth'


export const useAuthStore = defineStore('auth', () => {
  const BlogsData = useCookie<iListUser[]>('BlogsData', { default: () => [] });
  const Posts = useCookie('Posts', { default: () => [] });
  const router = useRouter()

  const doLogin = (userData: iListUser) => {
    BlogsData.value = [userData]
  }

  const doLogout = () => {
    BlogsData.value = []
    Posts.value = []
    router.push('/')
  }

  return {
    doLogin, BlogsData, doLogout
  }
})