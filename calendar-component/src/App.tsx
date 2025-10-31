import dayjs, { Dayjs } from 'dayjs';
import Calendar from './Calendar/index2'
import { useState } from 'react';

function App() {
  // const [date, setDate] = useState<Dayjs>(dayjs())
  // function onChange(date: Dayjs) {
  //   setDate(date)
  //   console.log(date)
  // }
  return (
    <div className="App">
      <Calendar
        locale="zh-CN"
        defaultValue={dayjs().subtract(1, 'month')}
        // value={date}
        // onChange={onChange}
        className="custom-calendar"
        style={{ backgroundColor: '#fff'}}
        // dateRender={(currentDate) => {
        //   return <div style={{ backgroundColor: 'blue', width: '300px' }}>{currentDate.format('YYYY/MM/DD')}</div>
        // }}
        dateInnerContent={(currentDate) => {
          return <div style={{ backgroundColor: '#fff', width: '240px' }}>{currentDate.format('YYYY/MM/DD')}</div>
        }}
      />
    </div>
  );
}

export default App
