import React, { useEffect, useMemo, useState } from 'react'
import { useLoaderData, type LoaderFunction, useParams } from 'react-router-dom'
import { fetchMatchData, fetchMatchStats } from '../../api'
import type { MatchData, LiveInfo, MatchStats } from '../../types'
import dayjs from 'dayjs'
import Tabs from '../../components/Tabs'
import Stats from './Stats'
import Player from '../../components/Player'

export const matchLoader: LoaderFunction = async ({ params }) => {
  if (params.id) {
    const match = await fetchMatchData(params.id, params.type)
    const stats = await fetchMatchStats(params.id)
    return {
      match,
      stats,
    }
  }
  return Response.json(
    { msg: '数据错误' },
    { statusText: '暂无数据', status: 404 }
  )
}

// const MATCH_STATUS = [1, 8, 10]

const Match: React.FC = () => {
  const params = useParams()
  const data = useLoaderData() as {
    match: MatchData
    stats?: MatchStats
  }

  const [currentLive, setCurrentLive] = useState<LiveInfo>(() => {
    const cur = data.match.matchinfo.live_urls.find(
      (l) => l.name === '腾讯' || l.name.includes('清')
    )
    return cur || data.match.matchinfo.live_urls[0]
  })

  const [match, setMatch] = useState(data.match.matchinfo)
  const [stats, setStats] = useState<MatchStats | undefined>(data.stats)
  const [loading, setLoading] = useState(false)
  const [updateStamp, setUpdateStamp] = useState(0)

  const playing = useMemo(
    () => data.match.matchinfo.status === 0,
    [data.match.matchinfo.status]
  )

  const liveUrl = useMemo(() => currentLive.url, [currentLive.url])

  useEffect(() => {
    if (playing && params.id && params.type && updateStamp) {
      setLoading(true)
      const res1 = fetchMatchData(params.id, params.type).then((data) =>
        setMatch(data.matchinfo)
      )
      const res2 = fetchMatchStats(params.id).then(setStats)
      Promise.all([res1, res2]).finally(() => {
        setLoading(false)
      })
    }
  }, [params.id, params.type, playing, updateStamp])

  // useEffect(() => {
  //   let timer: number | undefined
  //   if (playing) {
  //     timer = setInterval(() => setUpdateStamp((t) => t + 1), 6000)
  //   }
  //   return () => clearInterval(timer)
  // }, [playing])

  return (
    <section>
      <div>{playing && currentLive && <Player liveUrl={liveUrl} />}</div>
      <div className="text-center mt-4">
        {playing && (
          <div className="join">
            {data.match.matchinfo.live_urls.map((live) => (
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
        )}
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
      {playing && (
        <div className="my-4 text-center">
          <button
            className="btn btn-sm btn-success"
            disabled={loading}
            onClick={() => setUpdateStamp((t) => t + 1)}
          >
            刷新数据
          </button>
        </div>
      )}
      <div className="mx-auto my-4 p-2 max-w-lg ">
        {stats && (
          <Tabs
            className="tabs-boxed"
            items={[
              {
                label: '数据统计',
                value: 0,
                children: <Stats match={match} matchStats={stats} />,
              },
              {
                label: '球队数据',
                value: 1,
                children: null,
              },
            ]}
          />
        )}
      </div>
      <div>
        <div>status:{match.status}</div>
        <div>status_up:{match.status_up}</div>
        <div>status_up_name:{match.status_up_name}</div>
      </div>
    </section>
  )
}

export default Match
