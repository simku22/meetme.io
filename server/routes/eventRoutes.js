import express from "express";
import meetingRoutes from "./meetingRoutes.js";
import axios from "axios";
var router = express.Router();

// just adds a new meeting that is inactive and connected to eventName and userID
router.post("/create", async (req, res) => {
  try {
    const { eventName, user_id } = req.body;
    console.log(eventName + " " + user_id);
    const createMeetingQuery = `INSERT INTO events (event_name, user_id, created, is_active)
        VALUES ('${eventName}', '${user_id}', GETDATE(), 1);`;
    await req.sql.query(createMeetingQuery);
    res.send("success");
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { eventName, user_id } = req.body;
    const deleteEventQuery = `
      DELETE FROM events
      WHERE event_name = '${eventName}' AND user_id = '${user_id}';
    `;
    await req.sql.query(deleteEventQuery);
    res.send("success");
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.post("/end", async (req, res) => {
  try {
    const { eventID } = req.body;
    const updateEventQuery = `
      UPDATE events
      SET is_active = 0
      WHERE event_id = ${eventID};
    `;
    await req.sql.query(updateEventQuery);
    res.send("success");
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});


router.post("/:eventID/checkin", async (req, res) => {
  // get the event row from the eventID
  const { eventID } = req.params;
  const { name } = req.body;

  const resp = await req.sql.query(
    "SELECT * FROM events WHERE event_id = " + eventID
  );
  const event = resp.recordset[0];

  // check if the event exists
  if (event.length == 0) {
    res.status(404).send("There is no event record with that event ID");
    return;
  }

  // check if the event is active
  if (!event.is_active) {
    res.status(404).send("The event at this event ID is not currently active");
    return;
  }

  // at this point, we know we have an existing event that is currently active
  // we should now add the attendee to the most currently started meeting
  //                                          ^ this implementation can change if we find anything better
  const queryString = `SELECT TOP 1 meeting_id FROM meetings WHERE event_id = ${eventID} ORDER BY created DESC`;
  const meetingResp = await req.sql.query(queryString);
  const meetingID = meetingResp.recordset[0].meeting_id;
  // should probably check to make sure meeting_id is valid or something

  // add the attendee to the meeting

  const addAttendeeQuery = `INSERT INTO attendees (meeting_id, event_id, attendee_name, joined)
    VALUES (${meetingID}, ${eventID}, '${name}', GETDATE());`;
  const attendeeResp = await req.sql.query(addAttendeeQuery);

  try {
    const response = await axios.post(`http://localhost:3000/socketPostUser`, {
      name: name,
      eventID: eventID,
    });
  } catch (error) {
    console.error(error);
  }

  res.send(`success adding ${name} to the event`);
});

router.get("/:eventID/currentAttendees", async (req, res) => {
  try {
    const { eventID } = req.params;
    // check if the event exists
    const eventResp = await req.sql.query(
      "SELECT * FROM events WHERE event_id = " + eventID
    );
    const event = eventResp.recordset[0];
    if (!event) {
      res.status(404).send("There is no event record with that event ID");
      return;
    }

    // check if the event is active
    if (!event.is_active) {
      res
        .status(404)
        .send("The event at this event ID is not currently active");
      return;
    }

    // get the newest meeting for the event
    const meetingResp = await req.sql.query(
      `SELECT TOP 1 meeting_id FROM meetings WHERE event_id = ${eventID} ORDER BY created DESC`
    );
    const meetingID = meetingResp.recordset[0].meeting_id;

    // get all attendees for the meeting
    const attendeesResp = await req.sql.query(
      `SELECT * FROM attendees WHERE meeting_id = ${meetingID}`
    );
    const attendees = attendeesResp.recordset;

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

router.use("/:eventID/meeting", meetingRoutes);

export default router;
