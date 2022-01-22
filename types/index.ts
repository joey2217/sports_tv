export interface Response<T> {
  code: string
  data: T
  msg: string
}

export interface PageData<T> {
  currentPage: number
  total: number
  totalPage: number
  dataList: T[]
}

export interface Live {
  index: number
  name: string
  room_num: number
  seq: number
  status: number
  url: string
}

export interface IMatch {
  ateam_id: number
  ateam_logo: string
  ateam_name: string
  away_score_xiaojie: number[]
  cid: number
  global_live_urls: Live[]
  home_score_xiaojie: number[]
  hteam_id: number
  hteam_logo: string
  hteam_name: string
  id: number
  live_cartoon_url: any[]
  live_urls: Live[]
  matchtime: string
  matchtime_en: string
  mirror_live_urls: Live[]
  name: string
  score: string
  status: number
  status_up: number
  status_up_name: string
  time: string
  type: number
  video_url: string
  yazhi_jishi: string
}
