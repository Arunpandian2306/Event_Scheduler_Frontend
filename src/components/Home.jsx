import React from 'react';
import './Home.css'; // Import CSS for styling if needed

const Home = ({ setScreen }) => {
  return (
    <div className="home-container">
      <div className="header-box">
        <h1 style={{ color: '#6F4C3E' }}>EVENT Scheduler</h1>
      </div>
      <div className="button-container">
        <button onClick={() => setScreen('addEvent')}>Add Event</button>
        &nbsp;&nbsp;<button onClick={() => setScreen('eventList')}>Event List</button>
      </div>
    </div>
  );
};

export default Home;
