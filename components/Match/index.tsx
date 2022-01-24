import React, { memo, useEffect, useState } from 'react'
import { Divider, Image, Space, Typography } from 'antd'
import Link from 'next/link'
import { PlayCircleOutlined } from '@ant-design/icons'
import { IMatch } from '../../types'
import { queryStringify } from '../../utils'

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
      <div>{matchtime}</div>
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
      <Space split={<Divider type="vertical" />}>
        <PlayCircleOutlined />
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
      </Space>
    </div>
  )
}

export default memo(Match)
