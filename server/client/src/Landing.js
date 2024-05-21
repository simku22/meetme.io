import { Link } from 'react-router-dom';
import { Button, Box } from '@radix-ui/themes';
import React, {useEffect} from 'react';
import axios from 'axios';

export const LandingPage = (props) => {
    const { logindata } = props;
    /*
    const fetchData = async () => {
        try {
            const res = await axios.get(`${window.location.origin}/user/past-events`);
            // handle the response data here
        } catch (error) {
            // handle the error here
        }
    };

    useEffect(() => {
        fetchData();
    }, []); */
    return (
        <Box justify="center" align="center" m="4">
            {/* you can call logindata here */}
        </Box>
    );
};