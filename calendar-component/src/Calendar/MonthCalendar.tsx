// import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import cs from 'classnames'
import type { CalendarProps } from './index'
import { useContext, useState, type ReactNode } from 'react'
import LocaleContext from './LocaleContext'
import allLocales from './locale'

function renderDays(
  days: Array<{ date: Dayjs, currentMonth: boolean}>, 
  dateRender: (currentDate: Dayjs) => ReactNode, 
  dateInnerContent: (currentDate: Dayjs) => ReactNode,
  value: Dayjs,
  selectHandler: MonthCalendarProps['selectHandler'],
) {
  const rows = []
  for(let i = 0;i < 6;i++) {
    const row = []
    for(let j = 0;j < 7;j++) {
      const item = days[i * 7 + j]
      row[j] = (<div
          className={'calendar-month-body-cell' + (item.currentMonth ? ' calendar-month-body-cell-current' : '')}
          onClick={() => selectHandler?.(item.date)}
        >
        { 
          dateRender ? dateRender(item.date) : (
            <div className="calendar-month-body-cell-date">
              <div className={cs("calendar-month-body-cell-date-value", value.format('YYYY-MM-DD') === item.date.format('YYYY-MM-DD') ?
              'calendar-month-body-cell-date-selected' : '')}>{ item.date.date() }</div>
              <div className="calendar-month-body-cell-date-content">{ dateInnerContent?.(item.date) }</div>
            </div>
          )}
      </div>)
    }
    rows.push(row)
  }
  return rows.map(row => (<div className="calendar-month-body-row">{ row }</div>))
}

function getAllDays(date: Dayjs) {
  const startDate = date.startOf('month')
  const day = startDate.day()
  

  // 不管这个月有多少天，日历都是固定 6 * 7 个日期
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

interface MonthCalendarProps extends CalendarProps {
  selectHandler?: (date: Dayjs) => void,
  curMonth?: Dayjs
}

function MonthCalendar (props: MonthCalendarProps) {
  const localeContext = useContext(LocaleContext)
  const { value, dateRender, dateInnerContent, selectHandler, curMonth } = props
  const weekList: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  const CalendarLocale = allLocales[localeContext.locale]
  if (!CalendarLocale) {
    throw new Error(`Locale ${localeContext.locale} not found`)
  }
  const allDays = getAllDays(curMonth)

  return (
    <div className="calendar-month">
       <div className="calendar-month-week-list">
        {
          weekList.map((week) => (
            <div className="calendar-month-week-list-item" key={week}>{CalendarLocale.week[week]}</div>
          ))
        }
       </div>
       <div className="calendar-month-body">{ renderDays(allDays, dateRender, dateInnerContent, value, selectHandler) }</div>
    </div>
  )
}


export default MonthCalendar
