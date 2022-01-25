import { AxiosPromise } from 'axios'
import { Category, Response } from '../types'
import request from '../utils/request'

export function getCategoryList(): AxiosPromise<
  Response<{ twoCategoryList: Category[] }>
> {
  return request({
    url: '/category/list',
    method: 'GET',
    params: {
      type: 0,
      isoften: 1,
      ishot: 1,
    },
  })
}
