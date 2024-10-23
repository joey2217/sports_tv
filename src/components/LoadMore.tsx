import React, { useEffect, useRef } from 'react'
import { Skeleton } from './ui/skeleton'

interface Props {
  loadData: () => void
  loading: boolean
  finished: boolean
}

const LoadMore: React.FC<Props> = ({ loadData, loading, finished }) => {
  const loadRef = useRef<HTMLDivElement>(null)
  const loadMoreObserverRef = useRef<IntersectionObserver>()

  useEffect(() => {
    loadMoreObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadData()
        }
      })
    })
    return () => {
      loadMoreObserverRef.current?.disconnect()
    }
  }, [loadData])

  useEffect(() => {
    const loadEl = loadRef.current
    if (loadEl) {
      if (loading) {
        loadMoreObserverRef.current?.unobserve(loadEl)
      } else {
        loadMoreObserverRef.current?.observe(loadEl)
      }
    }
  }, [loading])

  useEffect(() => {
    if (finished) {
      loadMoreObserverRef.current?.disconnect()
    }
  }, [finished])

  if (finished) {
    return <div className="text-center py-2">没有更多了</div>
  }

  return (
    <div ref={loadRef} className="space-y-2">
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  )
}

export default LoadMore
