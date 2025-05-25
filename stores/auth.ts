import { defineStore } from 'pinia'
import type { iAuthData } from '@/types/auth'


export const useAuthStore = defineStore('auth', () => {
  const BlogsData = useCookie<iAuthData[]>('BlogsData', { default: () => [] });
  const doLogin = (userData: iAuthData) => {
    BlogsData.value = [userData]
  }

  const doLogout = () => {
    BlogsData.value = []
  }

  return {
    doLogin, BlogsData, doLogout
  }
})