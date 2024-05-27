import { Link } from 'react-router-dom';
import { Button, Box, Spinner, DataList, Badge, Flex, Card, Grid, Container, Code } from '@radix-ui/themes';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const LandingPage = (props) => {
    const { session } = props;
    const [eventBoxes, setEventBoxes] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get(`${window.location.origin}/user/past-events`);
                // console.log(res);
                // setEventBoxes(res.data.map((event) => {
                setEventBoxes(data.map((event) => {
                    return (
                        <Box>
                            <Card className="m-4">
                                <Flex gap="3" align="center">
                                    <DataList.Root>
                                    <DataList.Item align="center">
                                        <DataList.Label minWidth="88px">Event Name</DataList.Label>
                                        <DataList.Value>{event.event_name}</DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Is Active</DataList.Label>
                                        <DataList.Value>
                                        <Badge color={event.is_active ? "jade" : "gray"} variant="soft" radius="full">
                                            {event.is_active ? "Active" : "Inactive"}
                                        </Badge>
                                        </DataList.Value>
                                    </DataList.Item>
                                    <DataList.Item>
                                        <DataList.Label minWidth="88px">Event Dashboard</DataList.Label>
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
                console.log(eventBoxes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container justify="center" align="center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <Flex gap="3"> */}
                {/* // can you make a big button here that says "Create Event" and links to /create-event */}
                <Link to="/create-event">
                    {/* {session.status === 'loggedin' && <Button size="4" className="m-4" variant="soft">Create Event</Button>} */}
                    <Button size="4" className="m-4" variant="soft"><b>Create Event</b></Button>
                </Link>
                <Code>console.log()</Code>
                <Grid columns="2" rows="2" width="auto">
                    {eventBoxes.length === 0 ? (session.status === 'loggedin' ? <Spinner /> : <p>Signin please!</p>): eventBoxes}
                </Grid>
            {/* </Flex> */}
        </Container>
    );
};