import { AxiosPromise } from 'axios'
import { IMatch, MatchDetail, PageData, Response } from '../types'
import request from '../utils/request'

export function getMatchPage(): AxiosPromise<Response<PageData<IMatch>>> {
  return request({
    url: '/match/list/new',
    method: 'GET',
    params: {
      isfanye: 1,
      type: 2,
      cid: 1,
      ishot: 1,
      pn: 1,
      ps: 20,
      starttime: '2022-01-22',
      pid: 1,
    },
  })
}

interface MatchDetailParams {
  mid: number | string
  type?: number | string
}

export function getMatchDetail(
  params: MatchDetailParams
): AxiosPromise<Response<MatchDetail>> {
  return request({
    url: '/match/detail',
    method: 'GET',
    params: {
      isnew: 1,
      pid: 1,
      ...params,
    },
  })
}

//数据统计
export function getMatchDataStat(params: MatchDetailParams):AxiosPromise<Response<string>> {
  return request({
    url: '/match/detail/tabs',
    method: 'GET',
    params: {
      type: 2,
      tabtype: 2,
      ...params,
    },
  })
}
