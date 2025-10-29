import { useState } from "react";
import useMeragedState from "./utils/useMeragedState";

interface CalendarProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

function Calendar(props: CalendarProps) {
  const {
    defaultValue,
    value: propsValue,
    onChange
  } = props

  const [value, setValue] = useMeragedState(new Date(), { value: propsValue, onChange, defaultValue })
  return (
    <div>
      <h3>{value.toLocaleDateString()}</h3>
      <div onClick={() => { setValue(new Date('2025-10-27'))}}>2025-10-27</div>
      <div onClick={() => { setValue(new Date('2025-10-28'))}}>2025-10-28</div>
      <div onClick={() => { setValue(new Date('2025-10-29'))}}>2025-10-29</div>
    </div>
  )
}

function App () {
  const [value, setValue] = useState(new Date('2025-10-29'))
  // function onChange(date: Date) {
  //   console.log('onChange', date)
  // }
  return (
    <>
      {/* <Calendar defaultValue={new Date('2025-10-28')} onChange={onChange} /> */}
      <Calendar value={value} onChange={(date) => { setValue(date) }} />
    </>
  )
}

export default App
