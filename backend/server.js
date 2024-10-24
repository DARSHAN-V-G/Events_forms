const express = require('express');
const app = express();
require('dotenv').config()
const cors = require('cors');
app.use(cors());
app.use(express.json())

const Event = require('./routes/EventRoutes')

app.use('/event',Event);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});