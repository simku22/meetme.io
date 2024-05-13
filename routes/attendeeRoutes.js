import express from 'express';
var router = express.Router();




router.post('/join/:eventID', async function(req, res, next) {
    const { eventID } = req.params;
    const { userName } = req.body;

    // get current meeting id from the event
        // we are assuming there is a meeting active
        // should be the most 
    // add an entree into the attendee table, username, meetingid

});


export default router;
