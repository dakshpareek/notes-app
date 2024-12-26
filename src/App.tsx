import React from 'react';
import './App.css'; // Optional, for additional App styles
import NoteInput from './components/NoteInput.tsx';

function App() {
  return (
    <div className="App">
      <h1>Personal Notes</h1>
      <NoteInput />
    </div>
  );
}

export default App;
