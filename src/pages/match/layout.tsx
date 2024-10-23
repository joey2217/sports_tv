import Player from '@/components/Player'
import { Button } from '@/components/ui/button'
import type { LiveInfo, MatchData } from '@/types'
import React, { useState } from 'react'
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

const MatchLayout: React.FC = () => {
  const [, setSearchParams] = useSearchParams()

  const data = useLoaderData() as MatchData

  const { matchinfo: matchInfo } = data

  const [currentLive, setCurrentLive] = useState<LiveInfo>(() => {
    const cur = matchInfo.live_urls.find(
      (l) => l.name === '腾讯' || l.name.includes('清')
    )
    return cur || matchInfo.live_urls[0]
  })

  const hasLive = matchInfo.live_urls.length > 0

  const playing = matchInfo.status === 0

  return (
    <>
      <div>
        {hasLive ? (
          <Player liveUrl={currentLive.url} />
        ) : (
          <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            无直播
          </h2>
        )}
      </div>
      <div className="main">
        {hasLive && (
          <div className="my-2 text-center">
            <div className="button-group">
              {matchInfo.live_urls.map((live) => (
                <Button
                  key={live.index}
                  variant={
                    live.index === currentLive.index ? 'default' : 'ghost'
                  }
                  onClick={() => setCurrentLive(live)}
                >
                  {live.name}
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="card mx-auto my-4 p-2 max-w-lg text-center flex items-center justify-between gap-1 lg:gap-4">
          <div className="w-24 flex flex-col items-center">
            <img
              src={matchInfo.hteam_logo}
              alt={matchInfo.hteam_name}
              className="w-10 h-10"
            />
            <div className="truncate w-full">{matchInfo.hteam_name}</div>
          </div>
          <div>
            <div className="font-semibold text-lg">{matchInfo.score}</div>
            <div>{matchInfo.status_up_name}</div>
            <div>{dayjs(matchInfo.matchtime).format('YYYY-MM-DD HH:mm')}</div>
          </div>
          <div className="w-24 flex flex-col items-center">
            <img
              src={matchInfo.ateam_logo}
              alt={matchInfo.ateam_name}
              className="w-10 h-10"
            />
            <div className="truncate w-full">{matchInfo.ateam_name}</div>
          </div>
        </div>
        {playing && (
          <div className="py-2 text-center">
            <Button
              onClick={() =>
                setSearchParams({
                  t: Date.now().toString(),
                })
              }
            >
              刷新数据
            </Button>
          </div>
        )}
        <div className="py-2">
          <Outlet context={matchInfo} />
        </div>
      </div>
    </>
  )
}

export default MatchLayout
