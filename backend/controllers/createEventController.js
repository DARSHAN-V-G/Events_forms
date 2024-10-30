const pool = require('../config/db_connect');
const get = require('http')

const createEvent = async (req, res) => {
  const { event_name, date, team_size, description, other } = req.body;

  // Validate required fields
  if (!event_name || !date || !team_size) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  const eventDescription = description || ''; // Set description to empty string if not provided
  const otherqns = other || '';
  const otherArray = otherqns.split(',').map(item => item.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_'));
  
  try {
      // Check if event already exists
      const dbRes = await pool.query(
        `SELECT event_name FROM Events_details WHERE event_name = $1`,
        [event_name]
      );

      if (dbRes.rows.length === 0) { // Event does not exist, proceed with creating it
          // Insert the event into the Events_details table
          const insertQuery = `
              INSERT INTO Events_details (event_name, event_date, team_size, description) 
              VALUES ($1, $2, $3, $4)
          `;
          const values = [event_name.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_'), date, team_size, eventDescription];
          await pool.query(insertQuery, values);

          // Create a table for the event participants
          const eventTableName = event_name.replace(/[^a-zA-Z0-9]/g, '_');
          let query = `CREATE TABLE ${eventTableName} (`;

          // Extract team size range
          let [start, End] = team_size.split('-').map(Number);
          const end = End || 1;

          if (!(start === 1 && end === 1)) {
              query += `
              Team_Name VARCHAR(50) NOT NULL,`;
          }

          // Add fields based on team size range
          for (let i = 1; i <= start; i++) {
              query += `
                  Name_${i} VARCHAR(50) NOT NULL,
                  Roll_Number_${i} VARCHAR(6) NOT NULL,
                  Phone_Number_${i} VARCHAR(10) NOT NULL,
                  Email_${i} VARCHAR(20) NOT NULL,
                  Year_${i} INTEGER NOT NULL,
                  Department_${i} VARCHAR(20) NOT NULL,
              `;
          }
          for (let i = start + 1; i <= end; i++) {
              query += `
                  Name_${i} VARCHAR(50),
                  Roll_Number_${i} VARCHAR(6),
                  Phone_Number_${i} VARCHAR(10),
                  Email_${i} VARCHAR(20),
                  Year_${i} INTEGER,
                  Department_${i} VARCHAR(20),
              `;
          }

          // Add custom fields from "other" array
          otherArray.forEach(field => {
              if (field) {
                  query += `${field} VARCHAR(100) NOT NULL,`;
              }
          });

          // Remove the last comma and close the CREATE TABLE statement
          query = query.trim().slice(0, -1) + `);`;
          await pool.query(query);
          console.log(query);

          // Respond with success message
          res.status(201).json({ message: 'Event and event table added successfully' });

      } else {
          // Event already exists
          res.status(200).json({ message: 'Event already exists' });
      }
  } catch (err) {
      console.error('Error inserting event:', err);
      res.status(500).json({ error: 'An error occurred while adding the event' });
  }
};

  

module.exports = {
    createEvent
}
