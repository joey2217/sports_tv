import type { NextPage } from 'next'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Button, List, Tabs, Skeleton } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { IMatch, Category } from '../types'
import { getMatchPage } from '../api/match'
import { getCategoryList } from '../api/category'
import { getLocalLikes } from '../utils'
import Match from '../components/Match'

const DatePicker = dynamic(import('../components/DatePicker'), { ssr: false })

const { TabPane } = Tabs

const Home: NextPage = () => {
  const [list, setList] = useState<IMatch[]>([])
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState('')

  useEffect(() => {
    setLoading(true)
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
      setLoading(true)
      getMatchPage(category, date)
        .then((res) => {
          setList(res.data.data.dataList)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [category, date])

  return (
    <div>
      <Tabs
        activeKey={category}
        onChange={(key) => setCategory(key)}
        tabBarExtraContent={
          <>
            <DatePicker onChange={setDate} />
            <Link href="/like">
              <a>
                <Button icon={<HeartFilled />} type="link">
                  收藏
                </Button>
              </a>
            </Link>
          </>
        }
      >
        {categoryList.map((c) => (
          <TabPane tab={c.name} key={c.id} />
        ))}
      </Tabs>
      {loading ? (
        <Skeleton active />
      ) : (
        <List
          dataSource={list}
          renderItem={(item: IMatch) => (
            <List.Item>
              <Match {...item} />
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default Home
