import type { NextPage } from 'next'
import { List } from 'antd'
import { useEffect, useState } from 'react'
import { IMatch } from '../types'
import { getMatchPage } from '../api/match'
import Match from '../components/Match'

const Home: NextPage = () => {
  const [list, setList] = useState<IMatch[]>([])

  useEffect(() => {
    getMatchPage().then((res) => {
      setList(res.data.data.dataList)
    })
  }, [])

  return (
    <div>
      <List
        dataSource={list}
        renderItem={(item: IMatch) => (
          <List.Item>
            <Match {...item} />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Home
