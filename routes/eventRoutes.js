import express from 'express';

var router = express.Router();

router.post('/create', async(req, res) => {
    res.send('create event')
});

router.post('/create/:eventID/meeting/create')