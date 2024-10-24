import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamMemberForm from './TeamMemberForm';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './MainForm.css';

const MainForm = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [currentMember, setCurrentMember] = useState(1);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState('forward'); // Keep track of transition direction

  // Fetch data on component mount
  useEffect(() => {
    axios.get('/event/getSize/CodeRush')
      .then(response => {
        setStart(response.data.Start);
        setEnd(response.data.End);
      })
      .catch(error => {
        console.error('There was an error fetching the team size!', error);
      });
  }, []);

  // Handle form data submission and save member data in formData state
  const handleSubmit = (data, memberIndex) => {
    setFormData((prevData) => ({
      ...prevData,
      [memberIndex]: data  // Store each member's data by their index
    }));

    if (currentMember < end) {
      setDirection('forward');
      setCurrentMember(currentMember + 1);
    } else {
      // Send all data to the backend when the last member is submitted
      const flattenedData = Object.entries(formData).reduce((acc, [key, memberData]) => {
        // Add each member's properties to the accumulator object, prefixing the key
        Object.entries(memberData).forEach(([fieldKey, fieldValue]) => {
          acc[`${fieldKey}`] = fieldValue;  // Add fieldKey with member index suffix (e.g., Name_1, Email_1)
        });
        return acc;
      }, {});
  
      console.log('Flattened Data : ', flattenedData);
  
      axios.post('/event/register/CodeRush', flattenedData)
        .then(response => {
          console.log('Data successfully sent to the server!', response);
          alert('Data successfully submitted!');
        })
        .catch(error => {
          console.error('Error in sending data', error);
        });
    }
  };

  // Handle moving back to the previous form
  const handleBack = (memberIndex) => {
    setDirection('backward');
    setCurrentMember(memberIndex - 1);
  };

  if (start === null || end === null) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      width: '50%', 
      height: '50%', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <SwitchTransition>
        <CSSTransition
          key={currentMember}
          timeout={500}
          classNames={direction === 'forward' ? 'slide-forward' : 'slide-backward'}  // Conditional transition
        >
          <TeamMemberForm
            key={currentMember}
            memberIndex={currentMember}
            start={start}
            end={end}
            formData={formData[currentMember]}  // Pass current member's data
            onSubmit={handleSubmit}
            onBack={handleBack}  // Pass back handler
          />
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default MainForm;
