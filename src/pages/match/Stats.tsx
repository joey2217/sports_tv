import React from 'react'
import type { MatchInfo, MatchStats } from '../../types'

interface Props {
  match: MatchInfo
  matchStats: MatchStats
}

const Stats: React.FC<Props> = ({
  match,
  matchStats: { homerank, awayrank },
}) => {
  return (
    <div className="max-w-lg mx-auto">
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
          <div className="font-semibold text-3xl">VS</div>
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
          <div className="flex justify-center">
            <div className="w-1/2 flex items-center justify-end md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img src={homerank.defen.logo} alt={homerank.defen.name_zh} />
                </div>
              </div>
              <div className="flex-1 max-w-[140px] flex-shrink truncate">
                <div>#{homerank.defen.qiuyi}</div>
                <div className="truncate">{homerank.defen.name_zh}</div>
              </div>
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {homerank.defen.defen}
              </div>
            </div>
            <div className="w-1/2 text-right flex items-center md:gap-2">
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {awayrank.defen.defen}
              </div>
              <div className="flex-1 max-w-[140px] flex-shrink truncate">
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
          <div className="flex justify-center">
            <div className="w-1/2 flex justify-end items-center md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={homerank.lanban.logo}
                    alt={homerank.lanban.name_zh}
                  />
                </div>
              </div>
              <div className="flex-1 max-w-[140px] truncate flex-shrink">
                <div>#{homerank.lanban.qiuyi}</div>
                <div className="truncate">{homerank.lanban.name_zh}</div>
              </div>
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {homerank.lanban.lanban}
              </div>
            </div>
            <div className="w-1/2 flex items-center md:gap-2">
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {awayrank.lanban.lanban}
              </div>
              <div className="flex-1 max-w-[140px] truncate flex-shrink text-right">
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
          <div className="flex justify-center">
            <div className="w-1/2 flex justify-end items-center md:gap-2">
              <div className="avatar">
                <div className="w-10 h-10 rounded-xl">
                  <img
                    src={homerank.zhugong.logo}
                    alt={homerank.zhugong.name_zh}
                  />
                </div>
              </div>
              <div className="flex-1 max-w-[140px] truncate flex-shrink">
                <div>#{homerank.zhugong.qiuyi}</div>
                <div className="truncate">{homerank.zhugong.name_zh}</div>
              </div>
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {homerank.zhugong.zhugong}
              </div>
            </div>
            <div className="w-1/2 flex items-center gap-1 md:gap-2">
              <div className="font-semibold text-3xl self-end w-12 text-center">
                {awayrank.zhugong.zhugong}
              </div>
              <div className="flex-1 max-w-[140px] truncate flex-shrink text-right">
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
        </div>
      </div>
    </div>
  )
}

export default Stats
