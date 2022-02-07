import React, { memo, useEffect, useState } from 'react'
import { Image } from 'antd'
import Link from 'next/link'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import classnames from 'classnames'
import { IMatch } from '../../types'

dayjs.extend(isToday)

const weekDays = ['日', '一', '二', '三', '四', '五', '六']

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
    const [b, a] = score.split('-')
    setScoreA(Number(a))
    setScoreB(Number(b))
  }, [score])

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between text-center">
      <div className="text-center w-48">
        {dayjs(matchtime).isToday()
          ? dayjs(matchtime).format('HH:mm') + '(今日)'
          : dayjs(matchtime).format('YYYY-MM-DD HH:mm') +
            `(周${weekDays[dayjs(matchtime).day()]})`}
      </div>
      <div className="flex items-center text-center">
        <div className="flex items-center">
          <div className="w-16 text-right pr-2">{ateam_name}</div>
          <Image
            width={40}
            height={40}
            src={ateam_logo}
            preview={false}
            alt="ateam_logo"
          />
          <div
            className={classnames(
              scoreA > scoreB ? 'text-green-500' : '',
              'text-3xl font-bold w-16 text-center'
            )}
          >
            {scoreA}
          </div>
        </div>
        <div className="text-center w-11">
          <div>{name}</div>
          <div>{status_up_name}</div>
        </div>
        <div className="flex items-center">
          <div
            className={classnames(
              scoreB > scoreA ? 'text-green-500' : '',
              'text-3xl font-bold w-16 text-center'
            )}
          >
            {scoreB}
          </div>
          <Image
            width={40}
            height={40}
            src={hteam_logo}
            preview={false}
            alt="hteam_logo"
          />
          <div className="w-16 text-left pl-2">{hteam_name}</div>
        </div>
      </div>
      <div className="w-10">
        {status_up_name !== '未开赛' && (
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
        )}
      </div>
    </div>
  )
}

export default memo(Match)
