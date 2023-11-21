import { Category } from '../types'
import request from './request'

export function fetchCategoryList(): Promise<Category[]> {
  return request({
    url: '/category/list',
    params: {
      type: 0,
      isoften: 1,
      ishot: 1,
      langtype: 'zh',
    },
  }).then((res) => res.data.twoCategoryList)
}
