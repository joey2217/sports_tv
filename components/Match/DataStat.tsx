import { List, Tabs, Image, Table,Skeleton } from 'antd'
import React, { memo, useEffect, useState } from 'react'
import { getMatchDataStat } from '../../api/match'
import { IMatch, IPlayerStats } from '../../types'

const { TabPane } = Tabs

interface Props {
  mid: string | number
  match: IMatch
}

const DataStat: React.FC<Props> = ({ mid, match }) => {
  const [teamStats, setTeamStats] = useState<string[]>([])
  const [aTeamPlayers, setATeamPlayers] = useState<string[][]>([])
  const [hTeamPlayers, setHTeamPlayers] = useState<string[][]>([])
  useEffect(() => {
    getMatchDataStat({ mid })
      .then((res) => {
        const stat = JSON.parse(res.data.data)
        const players = stat.players as any[]
        let [hPlayers, aPlayers, hTeam, aTeam] = players
        setTeamStats([aTeam, hTeam])
        setATeamPlayers(aPlayers)
        setHTeamPlayers(hPlayers)
        console.log(players)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [mid])
  return (
    <div>
      <Tabs defaultActiveKey="teams" centered>
        <TabPane tab="球队" key="teams">
          {teamStats.length === 2 ? (
            <TeamStats teamStats={teamStats} match={match} />
          ) : (
            <Skeleton active />
          )}
        </TabPane>
        <TabPane tab="球员" key="players">
          <Tabs defaultActiveKey="a" centered size="small">
            <TabPane tab={match.ateam_name} key="a">
              <PlayerStats key="a" playerStats={aTeamPlayers} />
            </TabPane>
            <TabPane tab={match.hteam_name} key="h">
              <PlayerStats key="h" playerStats={hTeamPlayers} />
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default memo(DataStat)

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    width: '150px',
    ellipsis: true,
    render: (_: any, record: IPlayerStats) => (
      <>
        {/* <Avatar size="small" src={record.avatar} alt={record.name} /> */}
        <span>{record.name}</span>
        <span>#{record.number}</span>
      </>
    ),
  },
  {
    title: '首发',
    dataIndex: 'isStart',
    key: 'isStart',
    render: (isStart: boolean) => (isStart ? '是' : '否'),
  },
  {
    title: '时间',
    dataIndex: 'min',
    key: 'min',
  },
  {
    title: '得分',
    dataIndex: 'score',
    key: 'score',
  },
  {
    title: '投篮',
    dataIndex: 'shot',
    key: 'shot',
  },
  {
    title: '三分',
    dataIndex: 'three',
    key: 'three',
  },
  {
    title: '罚球',
    dataIndex: 'freeThrow',
    key: 'freeThrow',
  },
  {
    title: '前场篮板',
    dataIndex: 'offensiveRebound',
    key: 'offensiveRebound',
  },
  {
    title: '后场篮板',
    dataIndex: 'defensiveRebound',
    key: 'defensiveRebound',
  },
  {
    title: '总篮板',
    dataIndex: 'rebound',
    key: 'rebound',
  },
  {
    title: '助攻',
    dataIndex: 'assist',
    key: 'assist',
  },
  {
    title: '盖帽',
    dataIndex: 'block',
    key: 'block',
  },
  {
    title: '抢断',
    dataIndex: 'steal',
    key: 'steal',
  },
  {
    title: '失误',
    dataIndex: 'turnover',
    key: 'turnover',
  },
  {
    title: '犯规',
    dataIndex: 'foul',
    key: 'foul',
  },
]

function getPlayerStats(playerStatArr: string[]): IPlayerStats {
  const [id, name, p1, nameEn, avatar, number, stat] = playerStatArr
  const [
    min,
    shot,
    three,
    freeThrow,
    offensiveRebound,
    defensiveRebound,
    rebound,
    assist,
    steal,
    block,
    turnover,
    foul,
    s12,
    score,
    s14,
    s15,
    isStart,
  ] = stat.split('^')
  return {
    id,
    name,
    nameEn,
    avatar,
    number,
    min,
    shot,
    three,
    freeThrow,
    offensiveRebound,
    defensiveRebound,
    rebound,
    assist,
    steal,
    score,
    block,
    turnover,
    foul,
    isStart: isStart === '0',
  }
}

const PlayerStats: React.FC<{ playerStats: string[][] }> = ({
  playerStats,
}) => {
  const [list, setList] = useState<IPlayerStats[]>([])
  useEffect(() => {
    setList(playerStats.map((p) => getPlayerStats(p)))
  }, [playerStats])

  return <Table dataSource={list} columns={columns} pagination={false} />
}

const TeamStats: React.FC<{ teamStats: string[]; match: IMatch }> = ({
  teamStats,
  match,
}) => {
  const [aTeam, hTeam] = teamStats

  const [
    a0,
    a1,
    a2,
    a3,
    a4,
    a5,
    aReb,
    aAssist,
    aSteal,
    aBlock,
    aTurnover,
    a11,
    a12,
    aScore,
  ] = aTeam.split('^')
  const [
    h0,
    h1,
    h2,
    h3,
    h4,
    h5,
    hReb,
    hAssist,
    hSteal,
    hBlock,
    hTurnover,
    h11,
    h12,
    hScore,
  ] = hTeam.split('^')

  return (
    <List
      header={
        <div className="flex items-center justify-between ">
          <div>{match.ateam_name}</div>
          <Image width={40} height={40} src={match.ateam_logo} alt="awayTeam" />
          <div>VS</div>
          <Image width={40} height={40} src={match.hteam_logo} alt="homeTeam" />
          <div>{match.hteam_name}</div>
        </div>
      }
      bordered
    >
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aScore > hScore
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aScore}
          </div>
          <div>得分</div>
          <div
            className={
              hScore > aScore
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hScore}
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aReb > hReb
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aReb}
          </div>
          <div>篮板</div>
          <div
            className={
              hReb > aReb
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hReb}
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aAssist > hAssist
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aAssist}
          </div>
          <div>助攻</div>
          <div
            className={
              hAssist > aAssist
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hAssist}
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aBlock > hBlock
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aBlock}
          </div>
          <div>盖帽</div>
          <div
            className={
              hBlock > aBlock
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hBlock}
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aSteal > hSteal
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aSteal}
          </div>
          <div>抢断</div>
          <div
            className={
              hSteal > aSteal
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hSteal}
          </div>
        </div>
      </List.Item>
      <List.Item>
        <div className="flex items-center justify-between w-full">
          <div
            className={
              aTurnover < hTurnover
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {aTurnover}
          </div>
          <div>失误</div>
          <div
            className={
              hTurnover < aTurnover
                ? 'text-green-500 font-bold text-lg text-center w-12'
                : 'w-12 text-center'
            }
          >
            {hTurnover}
          </div>
        </div>
      </List.Item>
    </List>
  )
}
