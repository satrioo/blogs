<script setup lang="ts">
import { useToast } from "#imports";
import { createPost } from "@/api/posts";
import type { iBlogPost } from '@/types/article'

defineProps({
  title: {
    type: String,
    default: "",
  },
});

const Posts = useCookie<iBlogPost[]>('Posts', {
  default: () => [],
});

const toast = useToast();
const isLoading = ref(false);
const form = reactive({
  title: "",
  body: "",
});

const handleSubmit = () => {
  const payload = {
    title: form.title,
    body: form.body,
    userId: 1,
  };

  isLoading.value = true;

  if (!form.body || !form.title) {
    toast.add({ title: "Please fill title and body field", color: "error" });
    isLoading.value = false;
    return;
  }

  createPost(JSON.stringify(payload))
    .then(() => {
      toast.add({ title: "Success add post", color: "success" });
      form.title = "";
      form.body = "";
    })
    .catch(() => {
      toast.add({ title: "Failed to add post", color: "error" });
    })
    .finally(() => {
      Posts.value = [...(Posts.value || []), payload]; // append post
      isLoading.value = false;
      window.location.reload();
    });
};

</script>

<template>
  <UModal :title="title">
    <slot />
    <template #body>
      <div>
        <form class="space-y-4" @submit.prevent="handleSubmit">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <UInput
              id="name"
              v-model="form.title"
              type="text"
              placeholder="title"
              class="w-full"
            />
          </div>

          <div>
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Body
            </label>
            <UTextarea
              id="username"
              v-model="form.body"
              type="text"
              placeholder="body"
              class="w-full"
            />
          </div>

          <UButton type="submit" color="primary" block :loading="isLoading">
            Submit
          </UButton>
        </form>
      </div>
    </template>
  </UModal>
</template>
