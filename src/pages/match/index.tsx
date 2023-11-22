import React, { useState } from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  Outlet,
  NavLink,
} from 'react-router-dom'
import { fetchMatchData } from '../../api'
import type { MatchData, LiveInfo } from '../../types'
import Player from '../../components/Player'
import dayjs from 'dayjs'

export const matchLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchMatchData(params.id, params.type)
  }
  return Response.json(
    { msg: '数据错误' },
    { statusText: '暂无数据', status: 404 }
  )
}

const Match: React.FC = () => {
  const data = useLoaderData() as MatchData
  console.log(data)
  const [currentLive, setCurrentLive] = useState<LiveInfo>(
    data.matchinfo.live_urls[0]
  )
  const match = data.matchinfo
  return (
    <section>
      <div>{currentLive && <Player liveUrl={currentLive.url} />}</div>
      <div className="text-center">
        <div className="join">
          {data.matchinfo.live_urls.map((live) => (
            <button
              key={live.index}
              onClick={() => setCurrentLive(live)}
              className={`btn btn-sm join-item ${
                live.index === currentLive.index ? 'btn-primary' : ''
              }`}
            >
              {live.name}
            </button>
          ))}
        </div>
      </div>
      <div className="mx-auto my-4 p-2 max-w-lg rounded-lg lg:rounded-2xl shadow-xl text-center flex items-center justify-between gap-1 lg:gap-4">
        <div className="w-24 flex flex-col items-center">
          <img
            src={match.hteam_logo}
            alt={match.hteam_name}
            className="w-10 h-10"
          />
          <div className="truncate w-full">{match.hteam_name}</div>
        </div>
        <div>
          <div className="font-semibold text-lg">{match.score}</div>
          <div>{match.status_up_name}</div>
          <div>{dayjs(match.matchtime).format('YYYY-MM-DD HH:mm')}</div>
        </div>
        <div className="w-24 flex flex-col items-center">
          <img
            src={match.ateam_logo}
            alt={match.ateam_name}
            className="w-10 h-10"
          />
          <div className="truncate w-full">{match.ateam_name}</div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-boxed  max-w-lg mx-auto">
        <NavLink
          role="tab"
          className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
          to=""
          end
        >
          数据统计
        </NavLink>
        <NavLink
          role="tab"
          className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
          to="team"
          end
        >
          球队数据
        </NavLink>
      </div>
      <div className="container mx-auto">
        <Outlet context={data} />
      </div>
    </section>
  )
}

export default Match
