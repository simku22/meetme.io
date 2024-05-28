import {
  Button,
  Grid,
  Box,
  DecorativeBox,
  Spinner,
  DataList,
  Badge,
  Flex,
  Card,
  TextField,
  Heading,
  Text,
  Separator,
} from "@radix-ui/themes";
import React, { useEffect, useState, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
//import { WebSocketDemo } from './websocketDemo';

export const Dashboard = (props) => {
  const [users, setUsers] = useState(["test"]);
  const { eventID } = useParams();

  const WS_URL = `ws://localhost:3000/eventSocket?eventID=${eventID}`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    console.log("Connection state changed");
  }, [readyState]);

  useEffect(() => {
    if (lastMessage !== null) {
      console.log(lastMessage);
      const lastJsonMessage = JSON.parse(lastMessage.data);
      if (lastJsonMessage.event === "join") {
        setUsers([...users, lastJsonMessage.name]);
      }
    }
  }, [lastMessage]);

  const startMeeting = async () => {
    try {
      await axios.post(
        `${window.location.origin}/event/${eventID}/meeting/create`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const endMeeting = async () => {
    try {
      await axios.post(`${window.location.origin}/event/${eventID}/end`);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //     const fetchUsers = async () => {
  //         try {
  //             const response = await axios.get(`http://localhost:3000/event/${eventID}/currentAttendees`);
  //             setUsers(response.data.map(user => user.attendee_name));
  //         } catch (error) {
  //             console.error('Error fetching users:', error);
  //         }
  //     };

  //     fetchUsers();
  // }, []);

  return (
    <div className="justify-center items-center">
      {/* <Heading weight="bold" size="4" className="m-4">Dashboard</Heading> */}
      <div className="eventDashboard">
        <Box
          id="canvas"
          style={{
            backgroundColor: "lightgray",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <QRCode
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`http://localhost:3000/`}
          />
        </Box>
        <Box
          style={{
            backgroundColor: "lightblue",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <p
            id={"attendees_" + eventID}
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {users}
          </p>
        </Box>
      </div>
      <div className="meetingButtons">
        <Button size="3" variant="soft" onClick={startMeeting}>
          Start meeting
        </Button>
        <Button size="3" variant="soft" color="crimson" onClick={endMeeting}>
          End meeting
        </Button>
      </div>
    </div>
  );
};
