import React, { useState } from 'react';
import axios from 'axios';

const AddEvent = ({ setScreen }) => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(1);
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const addEvent = async () => {
    const eventDetails = {
      date,
      startHour: parseInt(startHour),
      endHour: parseInt(endHour)
    };

    try {
      const response = await axios.post('http://localhost:3000/event/add-event', eventDetails);
      if (response.status === 200) {
        setMessage('Event created successfully');
        setMessageColor('green');
      }
    } catch (error) {
      setMessage('Event overlaps with existing events');
      setMessageColor('red');
    }

    setTimeout(() => {
      setMessage('');
      setMessageColor('');
    }, 3000);
  };

  return (
    <div>
      <h2>Create a New Event</h2>
      <input
        type="date"
        value={date}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        value={startHour}
        onChange={(e) => setStartHour(e.target.value)}
        min="0"
        max="22"
        placeholder="Start Hour"
      />
      <input
        type="number"
        value={endHour}
        onChange={(e) => setEndHour(e.target.value)}
        min="1"
        max="23"
        placeholder="End Hour"
      />
      <button onClick={addEvent}>Add Event</button>
      <button onClick={() => setScreen('home')}>Go Back</button>
      {message && <p style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default AddEvent;
