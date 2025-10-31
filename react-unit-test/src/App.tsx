import React from 'react';
import './App.css';
import Toggle from './Toggle';
import useCounter from './useCounter';

function App() {
  const [count, increment, decrement] = useCounter();
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Toggle />
      </header>
      <section>
        <div>
          {count}
        </div>
        <div>
          <button onClick={() => increment(1)}>加一</button>
          <button onClick={() => decrement(2)}>减二</button>
        </div>
      </section>
    </div>
  );
}

export default App;
