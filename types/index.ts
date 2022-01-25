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
export interface MatchDetail {
  token: string
  hascount: number
  haslineup: number
  matchinfo: IMatch
}

export interface MatchStat {
  awayrank: string
  homerank: string
  players: any[]
}


export interface IPlayerStats {
  id: string | number
  name: string
  nameEn: string
  avatar: string
  number: string
  min: string
  score: string
  shot: string // 投篮 2-7
  three: string // 三分 2-7
  freeThrow: string // 罚球 2-7
  offensiveRebound: string // 前场篮板
  defensiveRebound: string // 后场篮板
  rebound: string // 篮板
  assist: string // 助攻
  block: string // 盖帽
  steal: string // 抢断
  turnover: string // 失误
  foul: string // 犯规
}

export interface Category {
  id: number
  logo: string
  name: string
  name_zh: string
  type: number
}