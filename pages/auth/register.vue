<script setup lang="ts">
import { useToast } from '#imports'
import { useAuthStore } from "@/stores/auth";

const toast = useToast()
const authStore = useAuthStore()

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: ''
})

const handleSubmit = () => {
  if (!form.name || !form.username || !form.email || !form.password) {
    toast.add({ title: 'Semua field wajib diisi', color: 'error' })
    return
  }

  toast.add({ title: 'Registrasi berhasil!', color: 'success' })
  authStore.doLogin(form) // atau ganti jadi doRegister kalau punya
}
</script>

<template>
  <UCard class="max-w-md mx-auto mt-10">
    <template #header>
      <h2 class="text-2xl font-bold">Register</h2>
    </template>

    <form class="space-y-4" @submit.prevent="handleSubmit">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <UInput
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Leanne Graham"
          class="w-full"
        />
      </div>

      <div>
        <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <UInput
          id="username"
          v-model="form.username"
          type="text"
          placeholder="Bret"
          class="w-full"
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <UInput
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Sincere@april.biz"
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
        Register
      </UButton>
      <p class="text-center text-sm">Or if you already have an account</p>
      <UButton type="submit" color="secondary" block>
        Login
      </UButton>
    </form>
  </UCard>
</template>
