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

// set is_active to 0, so attendees cant join the event
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

  // // add the attendee to the meeting and post to socket
  const addAttendeeQuery = `INSERT INTO attendees ( event_id, attendee_name, time_joined)
    VALUES (${eventID}, '${name}', GETDATE());`;
  const attendeeResp = await req.sql.query(addAttendeeQuery);

  try {
    const response = await axios.post(`${process.env.URL}/socketPostUser`, {
      name: name,
      eventID: eventID,
    });
  } catch (error) {
    console.error(error);
  }

  res.send(`success adding ${name} to the event`);
});

router.get("/:eventID/attendees", async (req, res) => {
  try {
    const { eventID } = req.params;

    // get all attendees for the event
    const attendeesResp = await req.sql.query(
      `SELECT attendee_name, time_joined FROM attendees WHERE event_id = ${eventID}`
    );
    const attendees = attendeesResp.recordset;

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
