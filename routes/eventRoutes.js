import express from 'express';

var router = express.Router();

router.post('/create', async(req, res) => {
    res.send('create event')
});

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
    const queryString = `SELECT TOP 1 meeting_id FROM meetings WHERE event_id = ${eventID} ORDER BY created DESC`
    const meetingResp = await req.sql.query(queryString)
    const meeting_id = meetingResp.recordset[0].meeting_id
    // should probably check to make sure meeting_id is valid or something

    // add the attendee to the meeting
    const { name } = req.body
    const addAttendeeQuery = `INSERT INTO attendees (meeting_id, attendee_name, time_joined)
    VALUES (${meeting_id}, '${name}', GETDATE());`
    const attendeeResp = await req.sql.query(addAttendeeQuery)
    res.send(`success adding ${name} to the event`)
})

export default router