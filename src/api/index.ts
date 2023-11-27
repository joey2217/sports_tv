import type { HotPageData, MatchData, MatchStats, TeamStats } from '../types'
import request from './request'

export interface PageParams {
  pn: number | string
  type: number | string
  cid: number | string
  ishot: number | string
  starttime: string | null
}

// 法甲 https://dszbok.com/prod-api/match/list/new?isfanye=1&type=1&cid=142&ishot=-1&pn=1&ps=20&level=&name=&langtype=zh&starttime=2023-11-23&pid=1&zoneId=Asia%2FShanghai
//  NBA https://dszbok.com/prod-api/match/list/new?isfanye=1&type=2&cid=1&ishot=-1&pn=1&ps=20&level=&name=&langtype=zh&starttime=2023-11-23&pid=1&zoneId=Asia%2FShanghai
// 篮球 https://dszbok.com/prod-api/match/list/new?isfanye=1&type=2&cid=0&ishot=-1&pn=1&ps=20&level=&name=&langtype=zh&pid=1&zoneId=Asia%2FShanghai
// 足球 https://dszbok.com/prod-api/match/list/new?isfanye=1&type=1&cid=0&ishot=-1&pn=1&ps=20&level=&name=&langtype=zh&pid=1&zoneId=Asia%2FShanghai
// 首页 https://dszbok.com/prod-api/match/list/new?isfanye=1&type=0&cid=0&ishot=1&pn=1&ps=20&level=&name=&langtype=zh&pid=1&zoneId=Asia%2FShanghai
export function fetchHotPageData(
  params?: Partial<PageParams>
): Promise<HotPageData> {
  return request({
    url: '/match/list/new',
    params: {
      isfanye: 1,
      type: 0,
      cid: 0,
      ishot: 1,
      pn: 1,
      ps: 20,
      level: '',
      name: '',
      langtype: 'zh',
      pid: 1,
      zoneId: 'Asia/Shanghai',
      ...params,
    },
  }).then((res) => res.data)
}

// https://dszbok.com/prod-api/match/detail?mid=4030887&type=1&isnew=1&pid=1&langtype=zh&test=1&zoneId=Asia%2FShanghai
export function fetchMatchData(
  mid: string | number,
  type = '1'
): Promise<MatchData> {
  return request({
    url: '/match/detail',
    params: {
      mid,
      type,
      isnew: 1,
      pid: 1,
      langtype: 'zh',
      test: 1,
      zoneId: 'Asia/Shanghai',
    },
  }).then((res) => res.data)
}

// https://dszbok.com/prod-api/match/detail/tabs?mid=3735671&type=2&tabtype=2&langtype=zh
// 统计
export function fetchMatchStats(
  mid: string | number
): Promise<MatchStats | undefined> {
  return request({
    url: '/match/detail/tabs',
    params: {
      mid,
      type: 2,
      tabtype: 2,
      langtype: 'zh',
    },
  }).then((res) => {
    if (typeof res.data === 'string') {
      const stats = JSON.parse(res.data)
      const homerank = JSON.parse(stats.homerank)
      const awayrank = JSON.parse(stats.awayrank)
      return {
        players: stats.players,
        awayrank,
        homerank,
      }
    } else {
      return undefined
    }
  })
}

// https://dszbok.com/prod-api/match/detail/tabs?mid=3735671&type=2&tabtype=3&langtype=zh
export function fetchMatchTeamStats(mid: string | number): Promise<TeamStats> {
  return request({
    url: '/match/detail/tabs',
    params: {
      mid,
      type: 2,
      tabtype: 3,
      langtype: 'zh',
    },
  }).then((res) => res.data)
}
