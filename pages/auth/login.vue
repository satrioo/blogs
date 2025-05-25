<script setup lang="ts">
import { useToast } from '#imports'
import { useAuthStore } from "@/stores/auth";

const toast = useToast() // ✅ valid di <script setup>
const authStore = useAuthStore()
const router = useRouter()
const form = reactive({
  email: '',
  password: ''
})

const handleSubmit = () => {
  if (!form.email || !form.password) {
    toast.add({ title: 'Email dan password wajib diisi', color: 'error' })
    return
  }

  toast.add({ title: 'Login berhasil!', color: 'success' })
  authStore.doLogin(form)
  router.push('/admin')
}
</script>
<template>
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
      <UButton type="submit" color="secondary" block>
        Register
      </UButton>
    </form>
  </UCard>
</template>
