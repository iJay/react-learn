import Header from './Header'
import MonthCalendar from './MonthCalendar'
import type { Dayjs } from 'dayjs'
import './index.scss'

export interface CalendarProps {
  value: Dayjs
}

function Calendar(props: CalendarProps) {
    return (
      <div className="calendar">
        <Header />
        <MonthCalendar {...props}/>
      </div>
    )
}

export default Calendar;