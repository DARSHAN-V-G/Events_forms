const pool = require('../config/db_connect');

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

const deleteEvent = async(req,res)=>{
    try{
        const{TableName}=req.params;
        let query=`DELETE FROM events_details WHERE event_name='${TableName}';`
        await pool.query(query);
        query=`DROP TABLE ${TableName};`
        await pool.query(query);
        res.status(201).json({ message: 'Event deleted successfully' });
    }catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ error: 'An error occurred while deleting event' });
      }
}

const getEventDetails = async(req,res)=>{
  try{
    const{event} = req.params;
    const query = `Select * from events_details where event_name = '${event}'`;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  }catch(err){
      console.error('Error retrieving data : ',err);
      res.status(500).json({error : 'An error occured while retrieving data'});
  }
  
}

module.exports={
    viewEvent,
    getcolumns,
    insertData,
    getSize,
    deleteEvent,
    getEventDetails
}