import { Link } from 'react-router-dom';
import { Button, Box, Spinner } from '@radix-ui/themes';
import React, { useState, useEffect} from 'react';
import axios from 'axios';

export const LandingPage = (props) => {
    const { session } = props;
    const [eventBoxes, setEventBoxes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${window.location.origin}/user/past-events`);
                console.log(res);
                setEventBoxes(res.data.map((event) => {
                    return (
                        <Box>
                            <h1>{event.event_name}</h1>
                            <p>{event.is_active}</p>
                            <Link to={`/event/${event.event_id}/dashboard`}>
                                <Button>{event.event_name}</Button>
                            </Link>
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
        <Box justify="center" align="center" m="4">
            {eventBoxes.length === 0 ? (session.status === 'loggedin' ? <Spinner /> : <p>Signin please!</p>): eventBoxes}
        </Box>
    );
};