
import { Button, Grid, Box, DecorativeBox, Spinner, DataList, Badge, Flex, Card, TextField, Heading, Text, Separator } from '@radix-ui/themes';
import React, { useEffect, useState, useCallback} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import QRCode from "react-qr-code";
import { WebSocketDemo } from './websocketDemo';

export const Dashboard = (props) => {
    const [ users, setUsers ] = useState([]);
    const { eventID } = useParams();

    const WS_URL = `${window.location.origin}/eventSocket`;
    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
      WS_URL,
      {
        share: false,
        shouldReconnect: () => true,
      },
    )

    useEffect(() => {
        console.log("Connection state changed")
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                event: "subscribe",
                data: {
                    channel: "general-chatroom",
                },
            })
        }
    }, [readyState])
    
    useEffect(() => {
        console.log(`Got a new message: ${lastJsonMessage}`)
    }, [lastJsonMessage])

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

    // return (
    //     <>
    //         <Grid rows="auto" columns="1fr 1fr">
    //             <Box id="canvas" style={{ width: '200px', height: '200px', backgroundColor: 'lightgray', padding: '20px', borderRadius: '10px' }}>
    //                 <QRCode
    //                     size={256}
    //                     style={{ height: "auto", maxWidth: "100%", width: "100%" }}
    //                     value={`http://localhost:3000/`}
    //                 />
    //             </Box>
    //             <Box style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
    //                 {/* Information box */}
    //                 {/* Use RadixUI Box component to create a box */}
    //                 {/* Update the information in this box with a webhook */}
    //                 <p id={'attendees_' + eventID} style={{ fontSize: '18px', fontWeight: 'bold' }}>{users}</p>
    //             </Box>
    //         </Grid>
    //         <Button style={{ marginTop: '20px' }} />
    //     </>
    // );

    return (
        <div className="justify-center items-center">
            {/* <Heading weight="bold" size="4" className="m-4">Dashboard</Heading> */}
            <div className="eventDashboard">
                <Box id="canvas" style={{ backgroundColor: 'lightgray', padding: '20px', borderRadius: '10px' }}>
                    <QRCode
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`http://localhost:3000/`}
                    />
                </Box>
                <Box style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
                     <p id={'attendees_' + eventID} style={{ fontSize: '18px', fontWeight: 'bold' }}>{users}</p>
                 </Box>
            </div>
            <WebSocketDemo />
        </div>
    );
}