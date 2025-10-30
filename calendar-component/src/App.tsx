import dayjs from 'dayjs';
import Calendar from './Calendar'

function App() {
  return (
    <div className="App">
      <Calendar value={dayjs('2023-11-08')} className="custom-calendar" style={{ backgroundColor: 'red'}}></Calendar>
    </div>
  );
}

export default App
