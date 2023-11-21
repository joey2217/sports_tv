import React from 'react'
import type { Match } from '../types'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

interface Props {
  match: Match
}

const MatchCard: React.FC<Props> = ({ match }) => {
  return (
    <Link
      to={`/match/${match.id}`}
      className="rounded-lg lg:rounded-2xl bg-base-300 shadow-xl text-center flex items-center justify-between gap-1 lg:gap-4"
    >
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
    </Link>
  )
}

export default MatchCard
