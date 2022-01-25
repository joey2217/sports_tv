export function queryStringify(query: {}): string {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, value as string)
  })
  return params.toString()
}

const LIKES = 'likes'

export function getLocalLikes(): string[] {
  const localData = localStorage[LIKES]
  if (localData) {
    return (localData as string).split(',')
  }
  return []
}

export function setLocalLikes(likes: string[]) {
  localStorage[LIKES] = likes.join()
}
