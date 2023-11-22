import React, { useState } from 'react'
import {
  useLoaderData,
  type LoaderFunction,
  useOutletContext,
} from 'react-router-dom'
import { fetchMatchStats } from '../../api'
import type { MatchData, MatchStats } from '../../types'

export const matchStatsLoader: LoaderFunction = ({ params }) => {
  if (params.id) {
    return fetchMatchStats(params.id)
  }
  return Response.json(
    { msg: '数据错误' },
    { statusText: '暂无数据', status: 404 }
  )
}

// TODO players

const Stats: React.FC = () => {
  const { homerank, awayrank } = useLoaderData() as MatchStats
  const matchData = useOutletContext() as MatchData
  const match = matchData.matchinfo

  const [team, setTeam] = useState<'home' | 'away'>('home')

  return (
    <div>
      <div>
        <div className="flex justify-center items-center text-center">
          <div className="w-24 flex flex-col items-center">
            <img
              src={match.hteam_logo}
              alt={match.hteam_name}
              className="w-10 h-10"
            />
            <div className="truncate w-full">{match.hteam_name}</div>
          </div>
          <div className="font-semibold text-4xl">VS</div>
          <div className="w-24 flex flex-col items-center">
            <img
              src={match.ateam_logo}
              alt={match.ateam_name}
              className="w-10 h-10"
            />
            <div className="truncate w-full">{match.ateam_name}</div>
          </div>
        </div>
        <div>
          <div className="my-2 text-center font-semibold text-base md:text-lg">
            得分
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img src={homerank.defen.logo} alt={homerank.defen.name_zh} />
                </div>
              </div>
              <div className="w-28">
                <div>#{homerank.defen.qiuyi}</div>
                <div className="truncate">{homerank.defen.name_zh}</div>
              </div>
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {homerank.defen.defen}
              </div>
            </div>
            <div className="text-right flex items-center gap-1 md:gap-2">
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {awayrank.defen.defen}
              </div>
              <div className="w-28">
                <div>#{awayrank.defen.qiuyi}</div>
                <div className="truncate">{awayrank.defen.name_zh}</div>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img src={awayrank.defen.logo} alt={awayrank.defen.name_zh} />
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 text-center font-semibold text-base md:text-lg">
            篮板
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={homerank.lanban.logo}
                    alt={homerank.lanban.name_zh}
                  />
                </div>
              </div>
              <div className="w-28">
                <div>#{homerank.lanban.qiuyi}</div>
                <div className="truncate">{homerank.lanban.name_zh}</div>
              </div>
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {homerank.lanban.lanban}
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {awayrank.lanban.lanban}
              </div>
              <div className="w-28 text-right">
                <div>#{awayrank.lanban.qiuyi}</div>
                <div className="truncate">{awayrank.lanban.name_zh}</div>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={awayrank.lanban.logo}
                    alt={awayrank.lanban.name_zh}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="my-2 text-center font-semibold text-base md:text-lg">
            助攻
          </div>
          <div className="flex justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={homerank.zhugong.logo}
                    alt={homerank.zhugong.name_zh}
                  />
                </div>
              </div>
              <div className="w-28">
                <div>#{homerank.zhugong.qiuyi}</div>
                <div className="truncate">{homerank.zhugong.name_zh}</div>
              </div>
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {homerank.zhugong.zhugong}
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <div className="font-semibold text-5xl self-end w-16 text-center">
                {awayrank.zhugong.zhugong}
              </div>
              <div className="w-28 text-right">
                <div>#{awayrank.zhugong.qiuyi}</div>
                <div className="truncate">{awayrank.zhugong.name_zh}</div>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={awayrank.zhugong.logo}
                    alt={awayrank.zhugong.name_zh}
                  />
                </div>
              </div>
            </div>
          </div>
          <div role="tablist" className="tabs tabs-boxed max-w-lg mx-auto">
            <button
              role="tab"
              onClick={() => setTeam('home')}
              className={`tab ${team === 'home' ? 'tab-active' : ''}`}
            >
              {match.hteam_name}
            </button>
            <button
              role="tab"
              className={`tab ${team === 'away' ? 'tab-active' : ''}`}
              onClick={() => setTeam('away')}
            >
              {match.ateam_name}
            </button>
          </div>
          <div>
            <div className={`${team === 'home' ? 'block' : 'hidden'}`}></div>
            <div className={`${team === 'away' ? 'block' : 'hidden'}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
