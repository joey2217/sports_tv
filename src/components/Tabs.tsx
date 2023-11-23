import React, { useMemo, useState } from 'react'

interface TabItem {
  label: React.ReactNode
  value: string | number
  children: React.ReactNode
}

interface Props {
  items: TabItem[]
  className?: string
  defalutActive?: string | number
}

const Tabs: React.FC<Props> = ({ items, className = '', defalutActive }) => {
  const [active, setActive] = useState(defalutActive || items[0]?.value)

  const activeTab = useMemo(() => {
    const tab = items.find((item) => item.value === active)
    if (tab) {
      return tab.children
    }
    return null
  }, [active, items])

  return (
    <>
      <div role="tablist" className={`tabs ${className}`}>
        {items.map((item) => (
          <button
            key={item.value}
            role="tab"
            className={`tab ${active === item.value ? 'tab-active' : ''}`}
            onClick={() => setActive(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div>{activeTab}</div>
    </>
  )
}

export default Tabs
