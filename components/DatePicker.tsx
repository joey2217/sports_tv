import React from 'react'
import dayjs,{ Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import locale from 'antd/es/date-picker/locale/zh_CN'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

const AntdDatePicker = generatePicker<Dayjs>(dayjsGenerateConfig)

export interface Props {
  onChange?:(dateString:string)=>void
}

const DatePicker: React.FC<Props> = ({onChange}) => {
  return (
    <AntdDatePicker
      placeholder="比赛日期"
      locale={locale}
      onChange={(m, dateString) =>onChange&&onChange(dateString)}
    />
  )
}

export default DatePicker
