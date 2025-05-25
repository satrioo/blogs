// ~/composables/useApi.ts
export function useApi() {
  const config = useRuntimeConfig()
  const toast = useToast()

  const baseURL = config.public.apiBaseUrl

  async function request<T>(
    url: string,
    opts: Omit<Parameters<typeof $fetch<T>>[1], 'baseURL'> = {}
  ): Promise<T | null> {
    try {
      return await $fetch<T>(url, {
        baseURL,
        ...opts,
      })
    } catch (error: any) {
      toast.add({
        title: 'Request Failed',
        description: error?.data?.message || error.message || 'Unexpected error',
        color: 'error',
      })
      return null
    }
  }

  return {
    get: <T>(url: string, opts?: any) => request<T>(url, { ...opts, method: 'GET' }),
    post: <T>(url: string, body?: any, opts?: any) =>
      request<T>(url, { ...opts, method: 'POST', body }),
    put: <T>(url: string, body?: any, opts?: any) =>
      request<T>(url, { ...opts, method: 'PUT', body }),
    del: <T>(url: string, opts?: any) => request<T>(url, { ...opts, method: 'DELETE' }),
  }
}
