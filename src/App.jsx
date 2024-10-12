import React, { useState } from 'react';
import Home from './components/Home';
import AddEvent from './components/AddEvent';
import EventList from './components/EventList';
import './App.css';  // Import the CSS file

const App = () => {
  const [screen, setScreen] = useState('home');

  return (
    <div className="app-container">
      {screen === 'home' && <Home setScreen={setScreen} />}
      {screen === 'addEvent' && <AddEvent setScreen={setScreen} />}
      {screen === 'eventList' && <EventList setScreen={setScreen} />}
    </div>
  );
};

export default App;
