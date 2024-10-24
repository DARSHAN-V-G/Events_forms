const express = require('express')
const{
    createEvent,
    viewEvent,
    getcolumns,
    insertData,
    getSize
} = require('../controllers/eventController');

const router = express.Router()
router.post('/create',createEvent)
router.get('/view/:TableName',viewEvent)
router.get('/getColumns/:TableName',getcolumns)
router.post('/register/:TableName',insertData)
router.get('/getSize/:TableName',getSize);
module.exports = router;