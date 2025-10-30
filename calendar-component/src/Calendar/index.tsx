import Header from './Header'
import MonthCalendar from './MonthCalendar'
import cs from 'classnames'
import type { Dayjs } from 'dayjs'
import './index.scss'

export interface CalendarProps {
  value: Dayjs;
  className?: string | string[];
  style?: React.CSSProperties;
}

function Calendar(props: CalendarProps) {
  const { className, style } = props
  const classNames = cs('calendar', className)
  return (
    <div className={classNames} style={style}>
      <Header />
      <MonthCalendar {...props}/>
    </div>
  )
}

export default Calendar;