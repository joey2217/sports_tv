import React, { memo, useEffect, useState } from 'react'
import { Row, Col, Card, Avatar, Skeleton } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { getCategoryList } from '../api/category'
import { Category } from '../types'
import { setLocalLikes, getLocalLikes } from '../utils'

const Like: React.FC = () => {
  const [likes, setLikes] = useState<string[]>([])
  const [categoryList, setCategoryList] = useState<Category[]>([])

  useEffect(() => {
    setLikes(getLocalLikes())
    getCategoryList().then((res) => {
      let categoryArr = res.data.data.twoCategoryList
      setCategoryList(categoryArr)
    })
  }, [])

  useEffect(() => {
    setLocalLikes(likes)
  }, [likes])

  return categoryList.length > 0 ? (
    <Row gutter={[10, 10]}>
      {categoryList.map((c) => (
        <Col key={c.name} xs={12} sm={8} md={6} lg={4} xl={3}>
          <Card
            actions={
              likes.includes(c.name)
                ? [
                    <HeartFilled
                      style={{ color: 'red' }}
                      key="like"
                      title="取消收藏"
                      onClick={() =>
                        setLikes((l) => l.filter((i) => i !== c.name))
                      }
                    />,
                  ]
                : [
                    <HeartOutlined
                      key="unlike"
                      title="收藏"
                      onClick={() => setLikes((l) => l.concat(c.name))}
                    />,
                  ]
            }
          >
            <Card.Meta avatar={<Avatar src={c.logo} />} title={c.name} />
          </Card>
        </Col>
      ))}
    </Row>
  ) : (
    <Skeleton active />
  )
}

export default memo(Like)
