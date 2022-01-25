import type { NextPage } from 'next'
import { List, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { IMatch, Category } from '../types'
import { getMatchPage } from '../api/match'
import { getCategoryList } from '../api/category'
import Match from '../components/Match'

const { TabPane } = Tabs

const likes = ['NBA', 'CBA']

const Home: NextPage = () => {
  const [list, setList] = useState<IMatch[]>([])
  const [category, setCategory] = useState('')
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    getCategoryList().then((res) => {
      let categoryArr = res.data.data.twoCategoryList
      categoryArr = categoryArr.filter((c) => likes.includes(c.name))
      if (categoryArr.length > 0) {
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
      <Tabs activeKey={category} onChange={(key) => setCategory(key)}>
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
