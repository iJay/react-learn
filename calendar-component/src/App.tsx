import dayjs from 'dayjs';
import Calendar from './Calendar'

function App() {
  return (
    <div className="App">
      <Calendar
        locale="zh-CN"
        value={dayjs('2023-11-08')}
        onChange={(date) => {
          alert(date.format('YYYY-MM-DD'));
        }}
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
