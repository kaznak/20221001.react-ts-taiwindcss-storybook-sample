import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="text-center">
      <header className={"min-h-screen flex flex-col items-center justify-center bg-stone-800 text-white text-3xl"}>
        <img src={logo} className="h-96 pointer-events-none motion-safe:animate-spin-slow" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="text-cyan-300"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      a
    </div>
  );
}

export default App;
