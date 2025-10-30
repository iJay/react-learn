import { useEffect, useImperativeHandle, useRef, useState } from 'react'
import './App.css'

function App () {
  // function onChange(date: Date) {
  //   alert(date.toLocaleDateString())
  // }

  const calendarRef = useRef<CalendarRef>(null)

  useEffect(() => {
    console.log(calendarRef.current?.getDate())
    setTimeout(() => {
      calendarRef.current?.setDate(new Date('2026-9-20'))
    }, 3000)
  }, [])

  return (
    <>
      {/* <Calendar defaultValue={new Date()} onChange={onChange} /> */}
      <Calendar ref={calendarRef} defaultValue={new Date()}/>
    </>
  )
}

interface CalendarProps {
  onChange?: (date: Date) => void;
  defaultValue?: Date;
  ref?: React.Ref<CalendarRef>;
}

interface CalendarRef {
  getDate: () => Date;
  setDate: (date: Date) => void;
}

function Calendar(props: CalendarProps) {

  const { onChange, defaultValue, ref } = props

  const [ date, setDate ] = useState(defaultValue || new Date())

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

  const daysOfMonth = (year: number, month: number) => {
    // 这里的day是从1开始到31， 如果传0，则返回的是上个月的最后一天；如果传-1，则返回的是上个月倒数第二天；
    return new Date(year, month + 1, 0).getDate()
  }

  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderDays = () => {
    const days = []

    const dayCount = daysOfMonth(date.getFullYear(), date.getMonth())
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth())

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty"></div>)
    }

    for (let i = 1; i <= dayCount; i++) {
      const clickHandler = () => {
        const curDate = new Date(date.getFullYear(), date.getMonth(), i)
        setDate(curDate)
        onChange?.(curDate)
      }
      if (i === date.getDate()) {
        days.push(<div key={`day-${i}`} className="day selected" onClick={clickHandler}>{i}</div>)
      } else {
        days.push(<div key={`day-${i}`} className="day" onClick={clickHandler}>{i}</div>)
      }
    }

    return days
  }

  // 这里如果想暴漏api给父组件使用，可以使用useImperativeHandle
  useImperativeHandle(ref, () => {
    return {
      getDate: () => date,
      setDate: (date: Date) => setDate(date)
    }
  }, [date])
  
  return (
    <div className="calendar">
      <div className="header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{ date.getFullYear() } 年 { monthNames[date.getMonth()] }</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day">日</div>
        <div className="day">一</div>
        <div className="day">二</div>
        <div className="day">三</div>
        <div className="day">四</div>
        <div className="day">五</div>
        <div className="day">六</div>
       {renderDays()}
      </div>
    </div>
  )
}

export default App
