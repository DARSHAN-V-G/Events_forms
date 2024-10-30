import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ViewTeams = () => {
  const [teams, setTeams] = useState([]);
  const [isSingleMemberTeams, setIsSingleMemberTeams] = useState(false);
  const location = useLocation();
  const { tableName } = location.state || {};

  useEffect(() => {
    axios.get(`/event/view/${tableName}`)
      .then(response => {
        setTeams(response.data);

        // Check if every team has only one member
        const singleMemberCheck = response.data.every(team => getTeamMembers(team).length === 1);
        setIsSingleMemberTeams(singleMemberCheck);
      })
      .catch(error => {
        console.error("There was an error fetching the teams!", error);
      });
  }, [tableName]);

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
    <div style={containerStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {!isSingleMemberTeams && <th style={headerCellStyle}>Team Name</th>}
            <th style={headerCellStyle}>Member Name</th>
            <th style={headerCellStyle}>Roll Number</th>
            <th style={headerCellStyle}>Phone Number</th>
            <th style={headerCellStyle}>Email</th>
            <th style={headerCellStyle}>Year</th>
            <th style={headerCellStyle}>Department</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, teamIndex) => {
            const teamMembers = getTeamMembers(team);
            const teamRowStyle = teamIndex % 2 === 0 ? evenTeamStyle : oddTeamStyle;
            return teamMembers.map((member, memberIndex) => (
              <tr key={`${teamIndex}-${memberIndex}`} style={teamRowStyle}>
                {!isSingleMemberTeams && (
                  <td style={cellStyle}>{team.team_name || "Unnamed Team"}</td>
                )}
                <td style={cellStyle}>{member.name}</td>
                <td style={cellStyle}>{member.rollNumber}</td>
                <td style={cellStyle}>{member.phoneNumber}</td>
                <td style={cellStyle}>{member.email}</td>
                <td style={cellStyle}>{member.year}</td>
                <td style={cellStyle}>{member.department}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTeams;

// Inline Styles
const containerStyle = {
  padding: '20px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  margin: '0 auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const headerCellStyle = {
  backgroundColor: '#007acc',
  color: '#ffffff',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ddd',
};

const cellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

/* Alternating team colors */
const evenTeamStyle = {
  backgroundColor: '#e6f7ff',
  color: 'black', // Light blue shade for even teams
};

const oddTeamStyle = {
  backgroundColor: '#f9f9f9',
  color: 'black', // Light gray shade for odd teams
};
