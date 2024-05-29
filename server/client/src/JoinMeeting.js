import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import * as Form from '@radix-ui/react-form';
import { Box } from '@radix-ui/themes';
import { Button } from "./components/ui/button"
import axios from 'axios';

export const JoinMeeting = () => {
    const [ name, setName ] = useState('');
    const { eventID } = useParams();
    //console.log(eventID)
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        //${paramValue}
        try {
            const response = await axios.post(`${window.location.origin}/event/${eventID}/checkin`, { name });
            console.log(response)

        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <Box
            className="justify-center items-center"
            style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
        >
            <Form.Root onSubmit={ handleSubmit } style={{ flex: '1' }}>
                <Form.Field name="name">
                <div className="m-4">
                    <Form.Label className="FormLabel">Name:</Form.Label>
                    <Form.Control asChild>
                        <input
                            className="ml-2 Input border-solid border-2 border-slate-200 rounded-sm"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Control>
                </div>
                </Form.Field>
                <Form.Submit asChild>
                    <Button className="ml-4" variant="default" size="lg">
                        Submit
                    </Button>
                </Form.Submit>
            </Form.Root>
        </Box>
    );
}

