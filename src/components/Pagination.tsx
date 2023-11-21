import React, { memo, useCallback, useMemo } from 'react'

interface Props {
  total?: number
  size?: number
  hideOnSinglePage?: boolean
  className?: string
  current: number
  onChange: (current: number) => void
}

const Pagination: React.FC<Props> = ({
  total = 0,
  current = 1,
  size = 20,
  hideOnSinglePage = false,
  onChange,
  className = ' ',
}) => {
  const pageNum = useMemo(() => {
    if (total > 0 && size > 0) {
      return Math.ceil(total / size)
    }
    return 0
  }, [size, total])

  const disabledPrev = useMemo(() => {
    return pageNum === 0 || current === 1
  }, [current, pageNum])

  const disabledNext = useMemo(() => {
    return pageNum === 0 || current === pageNum
  }, [current, pageNum])

  const onPageChange = useCallback(
    (current: number) => {
      onChange && onChange(current)
    },
    [onChange]
  )

  const onPageJump = useCallback(
    (dir: 'next' | 'prev') => {
      if (dir === 'next') {
        const n = current + 5 < pageNum ? current + 5 : pageNum
        onPageChange(n)
      } else {
        const n = current > 5 ? current - 5 : 1
        onPageChange(n)
      }
    },
    [current, onPageChange, pageNum]
  )

  const pages = useMemo(() => {
    if (pageNum === 0) {
      return (
        <li>
          <button className="btn join-item" disabled>
            0
          </button>
        </li>
      )
    } else if (pageNum <= 5) {
      return Array.from({ length: pageNum }).map((_item, index) => (
        <li key={index}>
          <button
            title={`${index + 1}`}
            onClick={() => onPageChange(index + 1)}
            className={`btn join-item ${
              current === index + 1 ? 'btn-primary' : ' '
            }`}
          >
            {index + 1}
          </button>
        </li>
      ))
    } else {
      const showFirst = current > 3
      const showPrev5 = current >= 5
      const showLast = current < pageNum - 2
      const showNext5 = current <= pageNum - 4
      let pageArr: number[] = []
      if (current < 4) {
        pageArr = [1, 2, 3, 4, 5]
      } else if (current < pageNum - 2) {
        pageArr = Array.from({ length: 5 }).map(
          (_item, index) => index + current - 2
        )
      } else {
        pageArr = Array.from({ length: 5 }).map(
          (_item, index) => pageNum + index - 4
        )
      }
      return (
        <>
          {showFirst && (
            <li>
              <button
                title="1"
                onClick={() => onPageChange(1)}
                className={`btn join-item ${
                  current === 1 ? 'btn-primary' : ' '
                }`}
              >
                1
              </button>
            </li>
          )}
          {showPrev5 && (
            <li>
              <button
                className="btn btn-neutral join-item"
                title="向前5页"
                onClick={() => onPageJump('prev')}
              >
                ❮❮
              </button>
            </li>
          )}
          {pageArr.map((p) => (
            <li key={p}>
              <button
                title={`${p}`}
                onClick={() => onPageChange(p)}
                className={`btn join-item ${
                  current === p ? 'btn-primary' : ' '
                }`}
              >
                {p}
              </button>
            </li>
          ))}
          {showNext5 && (
            <li>
              <button
                className="btn btn-neutral join-item"
                title="向后5页"
                onClick={() => onPageJump('next')}
              >
                ❯❯
              </button>
            </li>
          )}
          {showLast && (
            <li>
              <button
                title={`${pageNum}`}
                onClick={() => onPageChange(pageNum)}
                className={`btn  join-item ${
                  current === pageNum ? 'btn-primary' : ' '
                }`}
              >
                {pageNum}
              </button>
            </li>
          )}
        </>
      )
    }
  }, [pageNum, current, onPageChange, onPageJump])

  if (hideOnSinglePage && pageNum === 1) {
    return null
  }

  return (
    <ol className={`join ${className}`}>
      <li>
        <button
          className="btn join-item"
          disabled={disabledPrev}
          title="上一页"
          onClick={() => onPageChange(current - 1)}
        >
          <span className="sr-only">Prev current</span>❮
        </button>
      </li>
      {pages}
      <li>
        <button
          className="btn join-item"
          title="下一页"
          disabled={disabledNext}
          onClick={() => onPageChange(current + 1)}
        >
          <span className="sr-only">Next current</span>❯
        </button>
      </li>
    </ol>
  )
}

export default memo(Pagination)
