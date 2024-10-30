// EventDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const [eventData, setEventData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
    const {event} = useParams();
  useEffect(() => {
    // Fetch event details
    axios.get(`http://localhost:4000/event/getEventDetails/${event}`)
      .then((response) => {
        setEventData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, []);

  // Convert event name to camel case and replace '_' with ' '
  const formatEventName = (name) => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (!eventData) return <p>Loading...</p>;

  return (
    <div style={containerStyle}>
      <h1 style={eventNameStyle}>{formatEventName(eventData.event_name)}</h1>
      <p style={descriptionStyle}>
        {eventData.description} <br />
        Date: {formatDate(eventData.event_date)} <br />
        Team Size: {eventData.team_size}
      </p>
      
      {showRegisterForm ? (
        <RegisterForm 
        id={event}/>
      ) : (
        <button style={registerButtonStyle} onClick={() => setShowRegisterForm(true)}>
          Register
        </button>
      )}
    </div>
  );
};

export default EventDetails;

// Inline styles for layout and design
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: '20px',
  maxWidth: '600px',
  margin: '0 auto',
  fontFamily: 'Arial, sans-serif',
};

const eventNameStyle = {
  fontSize: '2rem',
  marginBottom: '10px',
};

const descriptionStyle = {
  fontSize: '1.2rem',
  color: '#555',
  marginBottom: '20px',
};

const registerButtonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};
