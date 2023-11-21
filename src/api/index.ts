import type { HotPageData, MatchData } from '../types'
import request from './request'

// https://dszbok.com/prod-api/match/list/new?isfanye=1&type=0&cid=0&ishot=1&pn=1&ps=20&level=&name=&langtype=zh&pid=1&zoneId=Asia%2FShanghai
export function fetchHotPageData(page = 1): Promise<HotPageData> {
  return request({
    url: '/match/list/new',
    params: {
      isfanye: 1,
      type: 0,
      cid: 0,
      ishot: 1,
      pn: page,
      ps: 20,
      level: '',
      name: '',
      langtype: 'zh',
      pid: 1,
      zoneId: 'Asia/Shanghai',
    },
  }).then((res) => res.data)
}

// https://dszbok.com/prod-api/match/detail?mid=4030887&type=1&isnew=1&pid=1&langtype=zh&test=1&zoneId=Asia%2FShanghai
export function fetchMatchData(mid: string | number): Promise<MatchData> {
  return request({
    url: '/match/detail',
    params: {
      mid,
      type: 1,
      isnew: 1,
      pid: 1,
      langtype: 'zh',
      test: 1,
      zoneId: 'Asia/Shanghai',
    },
  }).then((res) => res.data)
}
