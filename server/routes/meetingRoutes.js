import express from 'express';

var router = express.Router({mergeParams: true});


router.post('/create', async(req, res) => {
    try {
        const { eventID } = req.params;
        // check if event is active
        const queryString = `
        SELECT TOP 1 m.meeting_id, e.is_active, m.created
        FROM meetings m
        JOIN events e on e.event_id = m.event_id
        WHERE m.event_id = ${eventID}
        ORDER BY created DESC`
        const meetingResp = await req.sql.query(queryString)
        let meetingID = meetingResp.recordset[0].meeting_id
        const is_active = meetingResp.recordset[0].is_active
        // if active, send err
        if(is_active){
            res.status(404).send('The event at this event ID is currently active')
            return
        }
        // set meeting_id my incrementing by 1
        if(!meetingID){
            meetingID = 0
        }
        meetingID++;
        // if no meeting exists, start at 1
        // insert meeting into db
        await req.sql.query( `INSERT INTO meetings (meeting_id, event_id, created)
        VALUES (${meetingID}, ${eventID}, GETDATE());`)
        await req.sql.query( `UPDATE events
        SET is_active = 1
        WHERE event_id = ${eventID};`)
        res.send('meeting created, event is now active')
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
});

router.get('/:meetingID/attendees', async(req, res) => {
    try{    
        const { eventID, meetingID } = req.params;
        const resp = await req.sql.query(`
            SELECT a.* 
            FROM attendees a
            JOIN meetings m ON a.meeting_id = m.meeting_id
            WHERE m.meeting_id = '${meetingID}' AND m.event_id = '${eventID}'
        `);
        const attendees = resp.recordset;

        if (attendees.length == 0){
            res.status(404).send('There are no attendees for this meeting and event ID');
            return;
        }

    res.json(attendees);
    } catch (error) {
        res.status(500).json({ status: 'error', error: error.message });
    }
})


export default router