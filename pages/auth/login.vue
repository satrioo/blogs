<script setup lang="ts">
import { useToast } from '#imports'
import { useAuthStore } from "@/stores/auth";
import { getUser } from '@/api/posts'
import type { iListUser } from '@/types/auth'

const toast = useToast() 
const authStore = useAuthStore()
const router = useRouter()
const listUser = ref<iListUser[]>([])
const form = reactive({
  email: '',
  password: ''
})

const handleSubmit = () => {
  if (!form.email || !form.password) {
    toast.add({ title: 'Please fill field Email and password ', color: 'error' })
    return
  }
  
  const foundUser = listUser.value.find(item => item.email === form.email)
  if (foundUser) {
    toast.add({ title: 'Login success!', color: 'success' })
    authStore.doLogin(foundUser)
    router.push('/admin')
  } else {
    toast.add({ title: 'User is not registered', color: 'error' })
  }
}

onMounted(() => {
  getUser()
    .then((res) => {
      listUser.value = res as iListUser[]
    })
})
</script>
<template>
  <div>
  <UCard class="max-w-md mx-auto mt-10">
    <template #header>
      <h2 class="text-2xl font-bold">Login</h2>
    </template>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <UInput
          id="email"
          v-model="form.email"
          type="email"
          placeholder="you@example.com"
          class="w-full"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <UInput
          id="password"
          v-model="form.password"
          type="password"
          placeholder="********"
          class="w-full"
        />
      </div>

      <UButton type="submit" color="primary" block>
        Login
      </UButton>
      <p class="text-center text-sm">Or if you dont have an account</p>
      <UButton @click="router.push('/auth/register')" color="secondary" block>
        Register
      </UButton>
    </form>
  </UCard>

  <p class="text-center mt-3">Users who can log in must be on this list:
    <a target="_blank" class=" text-blue-700" href="https://jsonplaceholder.typicode.com/users">https://jsonplaceholder.typicode.com/users</a> if you’re not, you must register first</p>
  </div>
</template>
