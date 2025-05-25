import type { iArticle } from "@/types/article";

export async function getPosts() {
  return await useApi().get<iArticle[]>('/posts')
}

export async function getDetail(id: string) {
  return await useApi().get<iArticle>(`/posts/${id}`)
}

export async function getUser() {
  return await useApi().get(`/users`)
}

export async function createPost(data: string) {
  return await useApi().post<iArticle[]>('/posts', data)
}