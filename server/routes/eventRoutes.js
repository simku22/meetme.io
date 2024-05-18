import express from 'express';
import meetingRoutes from './meetingRoutes.js';
var router = express.Router();

// just adds a new meeting that is inactive and connected to eventName and userID
router.post('/create', async(req, res) => {
    try{
        const { eventName, userID } = req.body;
        //maybe we should check to see that this userID exists in the users table
        const createMeetingQuery = `INSERT INTO events (event_name, user_id, created, is_active)
        VALUES ('${eventName}', '${userID}', GETDATE(), 0);`
        await req.sql.query(createMeetingQuery)
        res.send('success')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/', async(req, res) => {
    //idk how we should handle this at the moment 

})

router.post('/:eventID/checkin', async(req, res) => {
    // get the event row from the eventID
    const { eventID } = req.params;
    const resp = await req.sql.query('SELECT * FROM events WHERE event_id = ' + eventID)
    const event = resp.recordset[0]

    // check if the event exists
    if (event.length == 0){
        res.status(404).send('There is no event record with that event ID')
        return
    }

    // check if the event is active
    if (!event.is_active){
        res.status(404).send('The event at this event ID is not currently active')
        return
    }

    // at this point, we know we have an existing event that is currently active
    // we should now add the attendee to the most currently started meeting
    //                                          ^ this implementation can change if we find anything better
    const queryString = `SELECT TOP 1 meeting_id, is_active FROM meetings WHERE event_id = ${eventID} ORDER BY created DESC`
    const meetingResp = await req.sql.query(queryString)
    const meetingID = meetingResp.recordset[0].meeting_id
    // should probably check to make sure meeting_id is valid or something

    // add the attendee to the meeting
    const { name } = req.body
    const addAttendeeQuery = `INSERT INTO attendees (meeting_id, event_id, attendee_name, joined)
    VALUES (${meetingID}, ${eventID}, '${name}', GETDATE());`
    const attendeeResp = await req.sql.query(addAttendeeQuery)
    res.send(`success adding ${name} to the event`)
})

router.put('/:eventID/end', async(req, res) => {
    try{
        const { eventID } = req.params;
        // get the event row from the eventID
        const resp = await req.sql.query('UPDATE events SET is_active = 0 WHERE event_id = ' + eventID)
        res.send('success')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.use('/:eventID/meeting', meetingRoutes);

export default router