
import { Button, Grid, Box, DecorativeBox } from '@radix-ui/themes';
import React, { useEffect, useState } from 'react';
export const Dashboard = (props) => {
    const [url, setUrl] = useState('');

    useEffect(() => {
        const url = window.location.href;
        setUrl(url);
    }, []);

    return (
        <>
            <Grid rows="auto" columns="1fr 1fr">
                <Box>
                    {/* QR code */}
                    {/* Use qrcode.js library to generate QR code based on the URL */}
                    {/* Display the generated QR code here */}
                    qrcode
                </Box>
                <Box>
                    {/* Information box */}
                    {/* Use RadixUI Box component to create a box */}
                    {/* Update the information in this box with a webhook */}
                    hook
                </Box>
            </Grid>
            <Button />
        </>
    );

}