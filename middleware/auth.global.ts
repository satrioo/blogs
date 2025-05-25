import { useAuthStore } from "@/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  const isLoggedIn = authStore.BlogsData.length > 0;
  const isAdminPage = to.path.includes('/admin');
  const isLoginPage = to.path === '/auth/login';

  if (isAdminPage && !isLoggedIn) {
    console.warn(isLoggedIn, 'Akses admin page tanpa login, redirect ke login');
    return navigateTo('/auth/login');
  }

  if (isLoggedIn && isLoginPage) {
    return navigateTo('/');
  }

});
