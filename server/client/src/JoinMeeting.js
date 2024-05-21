import React, { useState } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import axios from 'axios';

export const JoinMeeting = () => {
    const [name, setName] = useState('');
    const { eventID } = useParams();
    //console.log(eventID)
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        //${paramValue}
        try {
            const response = await axios.post(`http://localhost:3000/event/${eventID}/checkin`, { name });
            console.log(response)

        } catch (error) {
            console.error('Network error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

