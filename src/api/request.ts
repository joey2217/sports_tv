// https://dszbok.com/prod-api/category/list?type=0&isoften=1&ishot=1&langtype=zh

// const BASE_URL = 'https://dszbok.com/prod-api'
const BASE_URL = '/api'

const timestamp = Date.now().toString()

interface RequestConfig {
  url?: string
  params?: Record<string, unknown>
  cache?: boolean
}

interface ResponseData<T = unknown> {
  code: '0'
  data: T
  msg: string
}

export default function request<T = unknown>(config: RequestConfig) {
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
    .then((res: ResponseData<T>) => {
      if (res.code === '0') {
        return res.data
      } else {
        console.error('fetch error', config, res)
        throw new Error(res.msg)
      }
    })
    .catch((error) => {
      console.error('fetch error', config, error)
      throw error
    })
}
