import type { NextPage } from 'next'
import Link from 'next/link'
import { Button, List, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { IMatch, Category } from '../types'
import { getMatchPage } from '../api/match'
import { getCategoryList } from '../api/category'
import { getLocalLikes } from '../utils'
import Match from '../components/Match'
import { HeartFilled } from '@ant-design/icons'

const { TabPane } = Tabs

const Home: NextPage = () => {
  const [list, setList] = useState<IMatch[]>([])
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    getCategoryList().then((res) => {
      let categoryArr = res.data.data.twoCategoryList
      if (categoryArr.length > 0) {
        let localLikes = getLocalLikes()
        if (localLikes.length === 0) {
          localLikes = [categoryArr[0].name]
        }
        categoryArr = categoryArr.filter((c) => localLikes.includes(c.name))
        setCategory(String(categoryArr[0].id))
        setCategoryList(categoryArr)
      }
    })
  }, [])

  useEffect(() => {
    if (category) {
      getMatchPage(category).then((res) => {
        setList(res.data.data.dataList)
      })
    }
  }, [category])

  return (
    <div>
      <Tabs
        activeKey={category}
        onChange={(key) => setCategory(key)}
        tabBarExtraContent={
          <Link href="/like">
            <a>
              <Button icon={<HeartFilled/>} type="link">收藏</Button>
            </a>
          </Link>
        }
      >
        {categoryList.map((c) => (
          <TabPane tab={c.name} key={c.id} />
        ))}
      </Tabs>
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
