import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:4000/event/view/Coderush')
      .then(response => {
        const data = response.data;
        setTeams(data); // Set the data to state
      })
      .catch(error => {
        console.error("There was an error fetching the teams!", error);
      });
  }, []);

  // Function to extract all member numbers based on keys like name_1, name_2, etc.
  const getTeamMembers = (team) => {
    const members = [];
    const memberKeys = Object.keys(team).filter(key => key.startsWith("name_"));

    memberKeys.forEach(key => {
      const memberIndex = key.split('_')[1];
      const nameKey = `name_${memberIndex}`;
      const rollKey = `roll_number_${memberIndex}`;
      const phoneKey = `phone_number_${memberIndex}`;
      const emailKey = `email_${memberIndex}`;
      const yearKey = `year_${memberIndex}`;
      const departmentKey = `department_${memberIndex}`;

      // Check if the member's name and roll number are not empty (ignore empty records)
      if (team[nameKey]) {
        members.push({
          name: team[nameKey],
          rollNumber: team[rollKey],
          phoneNumber: team[phoneKey],
          email: team[emailKey],
          year: team[yearKey],
          department: team[departmentKey],
        });
      }
    });

    return members;
  };

  return (
    <div>
      <h1>Teams List</h1>
      {teams.map((team, index) => (
        <div key={index} className="team-section">
          <h2>Team {index + 1}</h2>
          <table border="1" style={{ margin: '20px 0', width: '100%' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Year</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {/* Loop through team members dynamically */}
              {getTeamMembers(team).map((member, memberIndex) => (
                <tr key={memberIndex}>
                  <td>{member.name}</td>
                  <td>{member.rollNumber}</td>
                  <td>{member.phoneNumber}</td>
                  <td>{member.email}</td>
                  <td>{member.year}</td>
                  <td>{member.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ViewTeams;
