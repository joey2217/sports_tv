import React, { memo, useEffect, useState } from 'react'
import { Image } from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { IMatch } from '../../types'

dayjs.extend(isToday)

const Match: React.FC<IMatch> = ({
  name,
  matchtime,
  ateam_name,
  ateam_logo,
  status_up_name,
  score,
  hteam_logo,
  hteam_name,
  id,
  type,
}) => {
  const [scoreA, setScoreA] = useState(0)
  const [scoreB, setScoreB] = useState(0)

  useEffect(() => {
    const [a, b] = score.split('-')
    setScoreA(Number(a))
    setScoreB(Number(b))
  }, [score])

  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-28 text-center">
        {dayjs(matchtime).isToday()
          ? dayjs(matchtime).format('HH:mm')
          : dayjs(matchtime).format('YYYY-MM-DD HH:mm')}
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <div>{ateam_name}</div>
          <Image
            width={40}
            height={40}
            src={ateam_logo}
            preview={false}
            alt="ateam_logo"
          />
          <div>{scoreA}</div>
        </div>
        <div className="text-center">
          <div>{name}</div>
          <div>{status_up_name}</div>
        </div>
        <div className="flex items-center">
          <div>{scoreB}</div>
          <Image
            width={40}
            height={40}
            src={hteam_logo}
            preview={false}
            alt="hteam_logo"
          />
          <div>{hteam_name}</div>
        </div>
      </div>
      <div className="w-10">
        <Link
          href={{
            pathname: `/match/${id}`,
            query: {
              type,
            },
          }}
        >
          <a>{status_up_name === '完场' ? '视频' : '直播'}</a>
        </Link>
      </div>
    </div>
  )
}

export default memo(Match)
