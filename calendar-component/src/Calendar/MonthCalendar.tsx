// import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import type { CalendarProps } from './index'

function renderDays(days: Array<{ date: Dayjs, currentMonth: boolean }>) {
  const rows = []
  for(let i = 0;i < 6;i++) {
    const row = []
    for(let j = 0;j < 7;j++) {
      const item = days[i * 7 + j]
      row[j] = (<div className={'calendar-month-body-cell' + (item.currentMonth ? ' calendar-month-body-cell-current' : '')}>{ item.date.date() }</div>)
    }
    rows.push(row)
  }
  return rows.map(row => (<div className="calendar-month-body-row">{ row }</div>))
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month')
  const day = startDate.day()
  

  // 不管这个月有多少天，我们日历都是固定 6 * 7 个日期
  const daysInfo: Array<{ date: Dayjs, currentMonth: boolean }> = new Array(6 * 7)

  // 填充上个月的天数
  for(let i = 0;i < day;i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, 'day'),
      currentMonth: false,
    }
  }

  // 继续填充这个月的天数以及下个月的天数 直到填充完 6 * 7 个日期
  for(let i = day;i < daysInfo.length;i++) {
    const calcDate = startDate.add(i - day, 'day')
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(), // 判断当前日期是否是当前月 还是下个月
    }
  }
  return daysInfo
}



function MonthCalendar (props: CalendarProps) {
  const { value } = props
  const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const allDays = getAllDays(value)

  return (
    <div className="calendar-month">
       <div className="calendar-month-week-list">
        {
          weekList.map((week) => (
            <div className="calendar-month-week-list-item" key={week}>{week}</div>
          ))
        }
       </div>
       <div className="calendar-month-body">{ renderDays(allDays) }</div>
    </div>
  )
}


export default MonthCalendar
