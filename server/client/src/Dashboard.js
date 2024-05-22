
import { Button, Grid, Box, DecorativeBox } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export const Dashboard = (props) => {
    const [users, setUsers] = useState([]);
    const { eventID } = useParams();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/event/${eventID}/currentAttendees`);
                setUsers(response.data.map(user => user.attendee_name));
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    

    return (
        <>
            <Grid rows="auto" columns="1fr 1fr">
                <Box style={{ backgroundColor: 'lightgray', padding: '20px', borderRadius: '10px' }}>
                    {/* QR code */}
                    {/* Use qrcode.js library to generate QR code based on the URL */}
                    {/* Display the generated QR code here */}
                    <img src="qrcode.png" alt="QR Code" style={{ width: '200px', height: '200px' }} />
                </Box>
                <Box style={{ backgroundColor: 'lightblue', padding: '20px', borderRadius: '10px' }}>
                    {/* Information box */}
                    {/* Use RadixUI Box component to create a box */}
                    {/* Update the information in this box with a webhook */}
                    <p id={'attendees_' + eventID} style={{ fontSize: '18px', fontWeight: 'bold' }}>{users}</p>
                </Box>
            </Grid>
            <Button style={{ marginTop: '20px' }} />
        </>
    );

}