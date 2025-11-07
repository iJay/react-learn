
import './App.css'
import createFrontIconFont from './Icon/createFrontIconFont'
import IconAdd from './Icon/icons/IconAdd'
import IconEmail from './Icon/icons/IconEmail'

const IconFont = createFrontIconFont('//at.alicdn.com/t/c/font_5059320_5t7rge5rdib.js')

function App() {
  return (
    <div style={ {padding: '50px'} }>
      <IconAdd size='40px'></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
      <hr />
      <IconFont type='icon-icon-test' style={{ color: 'blue'}} size='60px'/>
      <IconFont type='icon-icon-test1' size='30px'/>
    </div>
  )
}

export default App
