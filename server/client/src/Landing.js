import { Link } from 'react-router-dom';
import { Button, Box, Spinner, DataList, Badge, Flex, Card, TextField, Heading, Text, Separator } from '@radix-ui/themes';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const LandingPage = (props) => {
    const { session } = props;
    const [ eventBoxes, setEventBoxes ] = useState([]);
    const [ eventName, setEventName ] = useState('');

    const data = [
        {
            "event_id": 1011,
            "event_name": "simon crib",
            "created": null,
            "user_id": 16,
            "is_active": true
        },
        {
            "event_id": 1012,
            "event_name": "WAP listening party",
            "created": null,
            "user_id": 16,
            "is_active": true
        }
    ]
    
    function isUnder26Chars(str) {
        return str.length < 26;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`${window.location.origin}/user/past-events`);
                // setEventBoxes(res.data.map((event) => {
                setEventBoxes(data.map((event) => {
                    return (
                        <Box>
                            <Card className="m-4">
                            <Flex gap="3" align="center">
                                <DataList.Root>
                                <DataList.Item align="center">
                                    <DataList.Label>Event Name</DataList.Label>
                                    <DataList.Value>{event.event_name}</DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label>Active?</DataList.Label>
                                    <DataList.Value>
                                    <Badge color={event.is_active ? "jade" : "orange"} variant="soft">
                                        {event.is_active ? "Active" : "Inactive"}
                                    </Badge>
                                    </DataList.Value>
                                </DataList.Item>
                                <DataList.Item>
                                    <DataList.Label>Event Dashboard</DataList.Label>
                                    <DataList.Value>
                                    <Link to={`/event/${event.event_id}/dashboard`}>
                                        <Button variant="ghost">{event.event_name}</Button>
                                    </Link>
                                    </DataList.Value>
                                </DataList.Item>
                                </DataList.Root>
                            </Flex>
                            </Card>
                        </Box>
                    );
                }));
            } catch (error) {
                console.log(error);
            }
        };
        // setTimeout(() => { console.log('1 second passed'); }, 1000);
        fetchData();
    }, []);

    return (
        <div className="justify-center items-center">
            {/* <Heading weight="bold" size="4" className="m-4">Dashboard</Heading> */}
            <div className="eventDashboard">
                <div className="m-4">
                    <Text>Event Name</Text>
                    <TextField.Root className="mt-1" value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="feed me..."></TextField.Root>
                    {!isUnder26Chars(eventName) && <Text className="mt-1">Please enter a name under 26 characters</Text>}
                    <Button disabled={!isUnder26Chars(eventName) || eventName === ''} className="mt-4 mb-4" variant="soft"><b>Create Event</b></Button>
                </div>
                <div>
                    <Heading weight="regular" size="4" className="m-4">Past Events</Heading>
                    <Separator size="3" className="m-4"/>
                    {eventBoxes.length === 0 ? <Spinner className="m-4"/> : eventBoxes}
                </div>
            </div>
        </div>
    );
};