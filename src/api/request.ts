// https://dszbok.com/prod-api/category/list?type=0&isoften=1&ishot=1&langtype=zh

// const BASE_URL = 'https://dszbok.com/prod-api'
const BASE_URL = '/prod-api'

const timestamp = Date.now().toString()

interface RequestConfig {
  url?: string
  params?: Record<string, unknown>
  cache?: boolean
}

export default function request(config: RequestConfig) {
  const searchParams = new URLSearchParams(
    config.params as Record<string, string>
  )
  if (config.cache) {
    searchParams.append('t', timestamp)
  }
  return fetch(BASE_URL + config.url + '?' + searchParams.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error(error)
    })
}
