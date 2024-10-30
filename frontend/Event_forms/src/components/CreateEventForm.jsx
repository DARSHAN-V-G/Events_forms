// CreateEventForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import registerBackground from '../assets/registerBackground.svg'; // Import the image

const CreateEventForm = ({ onSuccess, onCancel }) => {
    const [eventName, setEventName] = useState('');
    const [date, setDate] = useState(null);
    const [teamSize, setTeamSize] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [registrationLink, setRegistrationLink] = useState('');

    const validateTeamSize = (size) => {
        const regex = /^(\d+(-\d+)?)$/;
        return regex.test(size);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateTeamSize(teamSize)) {
            setError("Team size must be a single number or two numbers separated by a hyphen.");
            return;
        }

        const eventData = {
            event_name: eventName,
            date: date ? date.format('YYYY-MM-DD') : '',
            team_size: teamSize,
            description: description,
            other: ""
        };

        try {
            await axios.post("http://localhost:4000/event/create", eventData);
            setRegistrationLink(`http://localhost:5173/register/${eventName}`);
            setError('');
            onSuccess();
        } catch (error) {
            console.error("Error creating event:", error);
            setError("There was an error creating the event.");
        }
    };

    return (
        <Box sx={formContainerStyle}>
            <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>Create New Event</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={formStyle} noValidate autoComplete="off">
                <TextField
                    label="Event Name"
                    variant="outlined"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    fullWidth
                    sx={inputStyle}
                    error={Boolean(error && !eventName)}
                />
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                required
                                fullWidth
                                sx={inputStyle}
                                error={Boolean(error && !date)}
                            />
                        )}
                    />
                </LocalizationProvider>
                <br />
                <TextField
                    label="Team Size"
                    variant="outlined"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    placeholder="Eg: 2 or 2-3"
                    required
                    fullWidth
                    sx={inputStyle}
                    error={Boolean(error && !teamSize)}
                    helperText={error && !validateTeamSize(teamSize) ? "Enter a valid team size format (e.g., 2 or 2-3)" : ""}
                />
                
                <TextField
                    label="Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    fullWidth
                    multiline
                    rows={4}
                    sx={inputStyle}
                    error={Boolean(error && !description)}
                />

                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                {/* Display registration link after successful submission */}
                {registrationLink && (
                    <Typography sx={{ mt: 2, mb: 2 }}>
                        Registration link: <a href={registrationLink} target="_blank" rel="noopener noreferrer">{registrationLink}</a>
                    </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={onCancel} // Call onCancel when "Cancel" button is clicked
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// Updated formContainerStyle to use the imported background image
const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '500px',
    margin: '25px auto',
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#f8f9fa',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundImage: `url(${registerBackground})`, // Use the imported image
    backgroundSize: 'cover', // Ensure the background image covers the entire div
    backgroundRepeat: 'no-repeat', // Prevent the background image from repeating
    backgroundPosition: 'center', // Center the background image
};

const formStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
};

const inputStyle = {
    marginBottom: 2,
};

export default CreateEventForm;
