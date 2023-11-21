import React, { useEffect, useRef } from 'react'

interface Props {
  loadData: () => void
  loading: boolean
}

let loadMoreObserver: IntersectionObserver

const LoadMore: React.FC<Props> = ({ loadData, loading }) => {
  const loadRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    loadMoreObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadData()
          console.log('loadData')
        }
      })
    })
    return () => {
      loadMoreObserver.disconnect()
    }
  }, [loadData])

  useEffect(() => {
    const loadEl = loadRef.current
    if (loading) {
      loadMoreObserver.unobserve(loadEl)
    } else {
      loadMoreObserver.observe(loadEl)
    }
  }, [loading])

  return (
    <div ref={loadRef} className="flex flex-col gap-4">
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  )
}

export default LoadMore
