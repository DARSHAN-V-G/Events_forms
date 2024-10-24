const { get } = require('http');
const pool = require('../config/db_connect');

const createEvent = async (req, res) => {
    const { event_name, date, team_size, description } = req.body;
  
    if (!event_name || !date || !team_size) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
  
    const eventDescription = description || ''; // Set description to empty string if it's not provided
  
    try {
      const dbRes = await pool.query(
        `SELECT event_name FROM Events_details WHERE event_name = $1`,
        [event_name]
      );
  
      if (dbRes.rows.length === 0) { // Event does not exist, proceed with creating it
        // Insert the event into the Events_details table
        let insertQuery = `
          INSERT INTO Events_details (event_name, event_date, team_size, description) 
          VALUES ($1, $2, $3, $4)
        `;
        const values = [event_name, date, team_size, eventDescription];
        await pool.query(insertQuery, values);
  
        // Create a table for the event participants
        let eventTableName = event_name.replace(/[^a-zA-Z0-9_]/g, '_');
        let query = `CREATE TABLE ${eventTableName} (`;
  
        let [start, end] = team_size.split('-').map(Number);
        for (let i = 1; i <= start; i++) {
          query += `
            Name_${i} VARCHAR(50) NOT NULL,
            Roll_Number_${i} VARCHAR(6) NOT NULL,
            Phone_Number_${i} VARCHAR(10) NOT NULL,
            Email_${i} VARCHAR(20) NOT NULL,
            Year_${i} INTEGER NOT NULL,
            Department_${i} VARCHAR(20) NOT NULL,`;
        }
        for (let i = start + 1; i <= end; i++) {
          query += `
            Name_${i} VARCHAR(50),
            Roll_Number_${i} VARCHAR(6),
            Phone_Number_${i} VARCHAR(10),
            Email_${i} VARCHAR(20),
            Year_${i} INTEGER,
            Department_${i} VARCHAR(20),`;
        }
        query = query.slice(0, -1) + `);`;
        await pool.query(query);
        console.log(query);
        // Respond with success message
        res.status(201).json({ message: 'Event and event table added successfully' });
  
      } else {
        // If the event already exists, respond with a message
        res.status(200).json({ message: 'Event already exists' });
      }
    } catch (err) {
      console.error('Error inserting event:', err);
      res.status(500).json({ error: 'An error occurred while adding the event' });
    }
  };
  

const viewEvent = async(req,res)=>{
    try{
        const {TableName} = req.params;
        const result = await pool.query(`SELECT * FROM ${TableName}`);
        res.status(200).json(result.rows);
    }catch(err){
        console.error('Error retrieving data : ',err);
        res.status(500).json({error : 'An error occured while retrieving data'});
    }
}

const getcolumns = async(req,res)=>{
    try{
      const { TableName } = req.params;

        if (!TableName) {
            return res.status(400).json({ error: 'TableName parameter is required' });
        }

        const query = `
            SELECT column_name, data_type, is_nullable, column_default
            FROM information_schema.columns
            WHERE table_name = $1;
        `;
        const values = [TableName.toLowerCase()];
        const result = await pool.query(query, values);

        res.status(200).json(result.rows);
    }catch(err){
      console.error('Error retrieving columns',err);
      res.status(500).json({error : 'An error occured while retrieving columns'})
    }
}

const insertData = async (req, res) => {
  const inputData = req.body;
  const { TableName } = req.params;

  // Check if input data exists
  if (!inputData || Object.keys(inputData).length === 0) {
    return res.status(400).json({ error: 'No input data provided' });
  }

  // Dynamically construct column names and values
  const columns = Object.keys(inputData); // Get column names from the input object
  const values = Object.values(inputData); // Get corresponding values

  // Create placeholders for the values in the SQL query (e.g., $1, $2, etc.)
  const placeholders = columns.map((_, index) => `$${index + 1}`);

  // Construct the SQL query
  const query = `
    INSERT INTO ${TableName.toLowerCase()} (${columns.join(', ')})
    VALUES (${placeholders.join(', ')})
  `;

  try {
    await pool.query(query, values);
    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'An error occurred while inserting data' });
  }
};
const getSize = async(req,res)=>{
  try{
    const{TableName} = req.params;
    console.log(TableName);
  const query = `Select team_size from events_details WHERE event_name='${TableName}'`;
  const result = await pool.query(query);
  if (result.rows.length > 0) {
    const teamSize = result.rows[0].team_size;
    const parts = teamSize.split('-');
    start = parseInt(parts[0], 10);
    end = parts[1] ? parseInt(parts[1], 10) : start;
    res.status(200).json({Start : `${start}`, End : `${end}`});
  } else {
    return res.status(404).json({ error: 'Event not found' });
  }
}catch(err){
  console.error('Error retrieving team_size',err);
  res.status(500).json({error : 'An error occured while retrieving team_size'})
}
}

module.exports = {
    createEvent,
    viewEvent,
    getcolumns,
    insertData,
    getSize
}
