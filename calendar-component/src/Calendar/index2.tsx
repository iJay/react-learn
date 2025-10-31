import Header from './Header'
import MonthCalendar from './MonthCalendar'
import cs from 'classnames'
import type { Dayjs } from 'dayjs'
import './index.scss'
import { useState, type ReactNode } from 'react'
import LocaleContext from './LocaleContext'
import dayjs from 'dayjs'
import { useControllableValue } from 'ahooks'

export interface CalendarProps {
  value: Dayjs;
  className?: string | string[];
  style?: React.CSSProperties;
  dateRender?: (currentDate: Dayjs) => ReactNode;
  dateInnerContent?: (currentDate: Dayjs) => ReactNode;
  locale?: string,
  onChange: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
  const { value, className, style, dateRender, dateInnerContent, locale, onChange } = props
  const classNames = cs('calendar', className)
  const [curValue, setCurValue] = useControllableValue<Dayjs>(props, {
    defaultValue: dayjs()
  })
  const [curMonth, setCurMonth] = useState<Dayjs>(curValue)

  function changeValue(date: Dayjs) {
    setCurMonth(date)
    setCurValue(date)
    onChange?.(date)
  }

  function selectHandler(date: Dayjs) {
    changeValue(date)
  }
  function prevMonthHandler () {
    setCurMonth(curMonth.subtract(1, 'month'))
  }

  function nextMonthHandler () {
    setCurMonth(curMonth.add(1, 'month'))
  }
  function todayHandler () {
    const today = dayjs(Date.now())
    changeValue(today)
  }
  return (
    <LocaleContext value={{ locale: locale || navigator.language }}>
      <div className={classNames} style={style}>
        <Header curMonth={curMonth} todayHandler={todayHandler} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} />
        <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler}/>
      </div>
    </LocaleContext>
  )
}

export default Calendar;