import {
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
import { Button } from "./components/ui/button"
import React, { useEffect, useState, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from "react-router-dom";
import axios from "axios";
import QRCode from "react-qr-code";
//import { WebSocketDemo } from './websocketDemo';

export const Dashboard = (props) => {
  const [ users, setUsers ] = useState(["test"]);
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

    let userCards = users.map((name, index) => {
        let dateJoined = new Date();
        let options = { timeZone: 'America/Los_Angeles' };
        let pstDateJoined = dateJoined.toLocaleString('en-US', options);
    
        return (
            <Box key={index}>
                <Card className="m-4">
                    <Flex gap="3" align="center">
                        <DataList.Root>
                            <DataList.Item align="center">
                                <DataList.Label>Name</DataList.Label>
                                <DataList.Value>{name}</DataList.Value>
                            </DataList.Item>
                            <DataList.Item>
                                <DataList.Label>Date Joined (PST)</DataList.Label>
                                <DataList.Value>{pstDateJoined}</DataList.Value>
                            </DataList.Item>
                        </DataList.Root>
                    </Flex>
                </Card>
            </Box>
        );
    });

  return (
    <div className="justify-center items-center">
      <div className="eventDashboard">
        <div className="flex flex-col justify-center">
            <Box
            id="canvas"
            style={{
                margin: '15px',
                padding: '10px',
                backgroundColor: "white",
                border: "2px solid black",
                borderRadius: "10px",
            }}
            >
                <QRCode
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={`${window.location.origin}/#/join/${eventID}`}
                />
            </Box>
            <Button 
                variant="default"
                size="sm"
                onClick={startMeeting}
                className="ml-4 mr-4 mb-2"
                style={{ color: "white", backgroundColor: "blue" }}
            >Start Meeting</Button>
            <Button 
                variant="default"
                size="sm"
                onClick={endMeeting}
                className="ml-4 mr-4 mb-2"
                style={{ color: "white", backgroundColor: "red" }}
            >End Meeting</Button>
        </div>
        <Box
          style={{
            margin: '15px',
            backgroundColor: "white",
            border: "2px solid black",
            borderRadius: "10px",
        }}
        >
          <p
            id={"attendees_" + eventID}
            style={{ fontSize: "18px", fontWeight: "bold" }}
          >
            {userCards}
          </p>
        </Box>
      </div>
    </div>
  );
};
