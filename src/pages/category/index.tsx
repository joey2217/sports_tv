import { Category } from '@/types'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const CategoryIndex: React.FC = () => {
  const data = useLoaderData() as Category[]
  return (
    <div className="grid gap-2 md:gap-4 grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.map((cate) => (
        <div key={cate.id} className="flex items-center gap-1">
          <Link
            className="flex items-center link"
            to={`c/${cate.id}/${cate.type}`}
          >
            <img
              src={cate.logo}
              alt={cate.name}
              className="w-4 h-4 object-cover"
            />
            <span>{cate.name_zh}</span>
          </Link>
          {/* <button>like</button> */}
        </div>
      ))}
    </div>
  )
}

export default CategoryIndex
