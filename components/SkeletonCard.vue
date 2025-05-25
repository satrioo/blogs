<script setup>
defineProps({
  detail: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex items-center gap-4 ">
    <div class="border border-gray-200 rounded-lg h-80" :class="detail ? 'w-full' : 'w-100'">
      <div class="p-4 space-y-4">
        <USkeleton class="h-15 w-80" :class="detail ? 'w-full' : 'w-80'" />
        <USkeleton class="h-32 w-90" :class="detail ? 'w-full' : 'w-90'" />
      </div>
      <div class="border-t border-gray-200 pt-2">
        <div class="p-4 space-y-2">
          <USkeleton class="h-10 w-50" />
        </div>
      </div>
    </div>
  </div>
</template>
