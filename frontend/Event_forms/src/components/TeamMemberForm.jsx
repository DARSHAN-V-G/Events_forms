import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const TeamMemberForm = ({ memberIndex, start, end, onSubmit, onBack, formData, TeamNameRequired }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [teamName, setTeamName] = useState('');

  const [errors, setErrors] = useState({}); // Track errors for validation

  const department = {
    "n2": "CSE (AI&ML)",
    "z2": "CSE - G1",
    "z3": "CSE - G2"
  };

  const year = {
    "23": 2,
    "22": 3,
    "24": 1
  };

  // Populate the form with existing data if available
  useEffect(() => {
    if (formData) {
      setName(formData[`Name_${memberIndex}`] || '');
      setRollNumber(formData[`Roll_Number_${memberIndex}`] || '');
      setPhoneNumber(formData[`Phone_Number_${memberIndex}`] || '');
      setTeamName(formData[`Team_Name`] || '');
    }
  }, [formData, memberIndex]);

  // Validate fields and show error messages if necessary
  const validateFields = () => {
    const newErrors = {};

    if (TeamNameRequired && !teamName) {
      newErrors.teamName = 'Team Name is required';
    }
    else if (!name) {
      newErrors.name = 'Name is required';
    }
    else if (!rollNumber) {
      newErrors.rollNumber = 'Roll Number is required';
    }
    else if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all required fields before submitting
    if (!validateFields()) return;

    const data = {
      [`Name_${memberIndex}`]: name,
      [`Roll_Number_${memberIndex}`]: rollNumber,
      [`Phone_Number_${memberIndex}`]: phoneNumber,
      [`Email_${memberIndex}`]: rollNumber.toLowerCase() + '@psgtech.ac.in',
      [`department_${memberIndex}`]: department[rollNumber.toLowerCase().slice(2, 4)],
      [`year_${memberIndex}`]: year[rollNumber.slice(0, 2)],
    };
    if (TeamNameRequired) {
      data[`Team_Name`] = teamName;
    }

    onSubmit(data, memberIndex);
  };

  const isRequired = memberIndex <= start;

  return (
    <Box sx={formContainerStyle}>
      <h2 style={{color:'black'}}>Member {memberIndex}</h2>
      <Box component="form" onSubmit={handleSubmit} sx={formStyle} noValidate autoComplete="off">
        {TeamNameRequired && (
          <TextField
            label="Team Name"
            variant="outlined"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required={isRequired}
            fullWidth
            sx={inputStyle}
            error={!!errors.teamName}
            helperText={errors.teamName}
          />
        )}
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={isRequired}
          fullWidth
          sx={inputStyle}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Roll Number"
          variant="outlined"
          placeholder='Eg : 23N213'
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required={isRequired}
          fullWidth
          sx={inputStyle}
          error={!!errors.rollNumber}
          helperText={errors.rollNumber}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required={isRequired}
          fullWidth
          sx={inputStyle}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <Box sx={buttonContainerStyle}>
          {memberIndex > 1 && (
            <button type="button" onClick={() => onBack(memberIndex)} style={backButtonStyle}>
              Back
            </button>
          )}
          {memberIndex < end ? (
            <button type="submit" style={nextButtonStyle}>Next</button>
          ) : (
            <button type="submit" style={submitButtonStyle}>Submit</button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// Styling for the form container
const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '500px',
  margin: '25px auto',
  padding: '10px',
  borderRadius: '15px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const formStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const inputStyle = {
  marginBottom: 2, // MUI spacing unit
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '20px',
};

const nextButtonStyle = {
  width: '48%',
  padding: '12px 0',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const backButtonStyle = {
  ...nextButtonStyle,
  backgroundColor: '#6c757d',
};

const submitButtonStyle = {
  ...nextButtonStyle,
  backgroundColor: '#28a745',
};

export default TeamMemberForm;
