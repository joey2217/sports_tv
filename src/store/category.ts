import { create } from 'zustand'
import { Category } from '../types'
import { getCategoryList } from '../api/category'
import { useEffect } from 'react'

export function useInitData() {
  const init = useCategoryStore((state) => state.init)
  useEffect(() => {
    init()
  }, [init])
}

interface CategoryState {
  categoryList: Category[]
  init: () => void
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categoryList: [],
  init() {
    getCategoryList().then((data) => {
      set({ categoryList: data })
    })
  },
}))
