export function queryStringify(query: {}): string {
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    params.append(key, value as string)
  })
  return params.toString()
}
