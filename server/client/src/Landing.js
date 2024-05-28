import { Link } from 'react-router-dom';
import { Button, Box, Spinner, DataList, Badge, Flex, Card, TextField, Heading, Text, Separator } from '@radix-ui/themes';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const LandingPage = (props) => {
    const { session } = props;
    const [ eventName, setEventName ] = useState('');
    const [ activeUserID, setActiveUserID ] = useState('');
    const [ eventData, setEventData ] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get(`${window.location.origin}/user/past-events`);
            console.log(res.data);
            if (res && res.data && res.data.meetings && res.data.userId) {
                setEventData(res.data.meetings);
                setActiveUserID(res.data.userId);
            } else {
                throw new Error('Returned event data is incomplete');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addEvent = async () => {
        try {
            if (activeUserID !== '') {
                await axios.post(`${window.location.origin}/event/create`, {
                    eventName: eventName,
                    user_id: activeUserID,
                }).then(() => {
                    fetchData();
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    function isUnder26Chars(str) {
        return str.length < 26;
    }

    let eventBoxes = eventData.map((event) => {
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
    });

    return (
        <div className="justify-center items-center">
            {/* <Heading weight="bold" size="4" className="m-4">Dashboard</Heading> */}
            <div className="eventDashboard">
                <div className="m-4">
                    <Heading weight="regular" size="4">Create events</Heading>
                    <Separator size="3" className="mt-4 mb-4"/>
                    <Text>Event Name</Text>
                    <TextField.Root className="mt-1" value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="feed me..."></TextField.Root>
                    {!isUnder26Chars(eventName) && <Text className="mt-1">Please enter a name under 26 characters</Text>}
                    <Button disabled={!isUnder26Chars(eventName) || eventName === ''} onClick={addEvent} className="mt-4 mb-4" variant="soft"><b>Create Event</b></Button>
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