import React, { useState } from 'react'
import { useLoaderData, type LoaderFunction } from 'react-router-dom'
import { fetchMatchData } from '../api'
import type { MatchData, LiveInfo } from '../types'
import Player from '../components/Player'

export const matchLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchMatchData(params.id)
  }
  return Response.json(
    { msg: '数据错误' },
    { statusText: '暂无数据', status: 404 }
  )
}

const Match: React.FC = () => {
  const data = useLoaderData() as MatchData

  const [currentLive, setCurentLive] = useState<LiveInfo>(
    data.matchinfo.live_urls[0]
  )

  return (
    <section>
      {/* <div>{currentLive && <Player liveUrl={currentLive.url} />}</div> */}
    </section>
  )
}

export default Match
