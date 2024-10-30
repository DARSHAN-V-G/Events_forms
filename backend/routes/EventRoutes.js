const express = require('express')
const{
    createEvent
} = require('../controllers/createEventController');

const{
    viewEvent,
    getcolumns,
    insertData,
    getSize,
    deleteEvent,
    getEventDetails
} = require('../controllers/manageEventController')
const router = express.Router()
router.post('/create',createEvent);
router.post('/register/:TableName',insertData);

router.get('/delete/:TableName',deleteEvent);
router.get('/view/:TableName',viewEvent);
router.get('/getColumns/:TableName',getcolumns);
router.get('/getSize/:TableName',getSize);
router.get('/getEventDetails/:event',getEventDetails);
module.exports = router;