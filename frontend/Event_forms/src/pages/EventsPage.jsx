// EventsPage.jsx
import "./EventsPage.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CreateEventForm from '../components/CreateEventForm'; // Import CreateEventForm

const EventsPage = () => { 
    const [events, setEvents] = useState([]);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false); // Control overlay visibility
    const navigate = useNavigate(); 

    const handleViewDetails = (eventName) => {
        navigate(`/view`, { state: { tableName: eventName } });
    };

    const fetchEvents = () => {
        axios.get(`/event/view/events_details`)
          .then(response => {
            setEvents(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the events!", error);
          });
    };

    useEffect(() => { 
        fetchEvents();
    }, []);

    const handleEventCreated = () => {
        setIsCreateEventOpen(false);
        fetchEvents(); // Reload events after creating a new event
    };

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return ( 
        <div className="events-page">
            <button 
                className="create-event-button" 
                onClick={() => setIsCreateEventOpen(true)}
            >
                Create Event
            </button>

            <div className="cards"> 
                {events.map((event) => ( 
                    <label key={event.event_name} className="card-label" id={event.event_name.toLowerCase()}> 
                        <input type="checkbox" id="eventInput" /> 
                        <div className="card"> 
                            <div className="front"> 
                                <header> 
                                    <h2 id="event-title">{event.event_name}</h2>
                                    <span className="material-symbols-outlined">arrow_right_alt</span>
                                </header> 
                                <h4 id="team-size">Team Size: {event.team_size}</h4>
                                <p className="description-text">{formatDate(event.event_date)}</p>
                                <button className="view-details-button" onClick={() => handleViewDetails(event.event_name)}>
                                    View Details
                                </button>
                            </div> 
                            <div className="back"> 
                                <header> 
                                    <h2 id="event-title-back">{event.event_name}</h2>
                                    <span className="material-icons">close</span> 
                                </header> 
                                <h5 id="event-description">{event.description}</h5>
                            </div> 
                        </div> 
                    </label> 
                ))} 
            </div> 

            {/* Overlay for CreateEventForm */}
            {isCreateEventOpen && (
                <div className="overlay">
                    <CreateEventForm 
                        onSuccess={handleEventCreated} 
                        onCancel={() => setIsCreateEventOpen(false)} // Close overlay when cancel button is clicked
                    />
                </div>
            )}
        </div>
    );
};

export default EventsPage;
