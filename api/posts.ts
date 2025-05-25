import type { iArticle } from "@/types/article";

export async function getPosts() {
  return await useApi().get<iArticle[]>('/posts')
}

export async function getDetail(id: string) {
  return await useApi().get<iArticle>(`/posts/${id}`)
}
