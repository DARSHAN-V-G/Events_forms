import React, { useState, useEffect } from 'react';

const TeamMemberForm = ({ memberIndex, start, end, onSubmit, onBack, formData }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const department = {
    "n2" : "CSE (AI&ML)",
    "z2" : "CSE - G1",
    "z3" : "CSE - G2"
  };

  const year = {
    "23" : 2,
    "22" : 3,
    "24" : 1
  };

  // Populate the form with existing data if available
  useEffect(() => {
    if (formData) {
      setName(formData[`Name_${memberIndex}`] || '');
      setRollNumber(formData[`Roll_Number_${memberIndex}`] || '');
      setPhoneNumber(formData[`Phone_Number_${memberIndex}`] || '');
    }
  }, [formData, memberIndex]);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      [`Name_${memberIndex}`]: name,
      [`Roll_Number_${memberIndex}`]: rollNumber,
      [`Phone_Number_${memberIndex}`]: phoneNumber,
      [`Email_${memberIndex}`]: rollNumber.toLowerCase() + '@psgtech.ac.in',
      [`department_${memberIndex}`]: department[rollNumber.toLowerCase().slice(2,4)],
      [`year_${memberIndex}`]: year[rollNumber.slice(0,2)],
    };

    onSubmit(data, memberIndex);
  };

  const isRequired = memberIndex <= start;

  return (
    <div style={formContainerStyle}>
      <h2>Member {memberIndex}</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={isRequired}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Roll Number:
          <input
            type="text"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required={isRequired}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required={isRequired}
            style={inputStyle}
          />
        </label>
        <div style={buttonContainerStyle}>
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
        </div>
      </form>
    </div>
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
  margin: '50px auto',  // Center the form vertically with space above and below
  padding: '30px',
  borderRadius: '15px',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  color: 'black',  // Add subtle shadow for depth
};

// Styling for the form fields
const formStyle = {
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#fff',
  outline: 'none',
  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'border-color 0.3s ease',
  color: 'black',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
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
  backgroundColor: '#6c757d', // Grey color for back button
};

const submitButtonStyle = {
  ...nextButtonStyle,
  backgroundColor: '#28a745', // Green color for submit button
};

export default TeamMemberForm;
