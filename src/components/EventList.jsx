import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EventList.css'; // Import CSS file

const EventList = ({ setScreen }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event/events');
        if (response.data.status === 'SUCCESS') {
          setEvents(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

 
  const formatTime = (hour) => {
    const adjustedHour = hour % 12 || 12; 
    const period = hour >= 12 ? 'PM' : 'AM'; 
    return `${adjustedHour}:00 ${period}`;
  };

  const currentDate = new Date();

  return (
    <div className="event-list-container">
      <h2>Event List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {events
              .sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA.getTime() === dateB.getTime()) {
                  return a.start_time - b.start_time; 
                }
                return dateA - dateB;
              })
              .map((event) => {
                const eventDate = new Date(event.date);
                const eventStartTime = new Date(event.date);
                eventStartTime.setHours(event.start_time);

                const isPastEvent = eventStartTime < currentDate;

                return (
                  <tr
                    key={event.date + event.start_time}
                    className={isPastEvent ? 'past-event' : ''}
                  >
                    <td>{event.date}</td>
                    <td>{formatTime(event.start_time)}</td>
                    <td>{formatTime(event.end_time)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="button-container">
        <button onClick={() => setScreen('home')}>Go Back</button>
      </div>
    </div>
  );
};

export default EventList;