import { Link } from 'react-router-dom';
import { Button, Box } from '@radix-ui/themes';

export const LandingPage = (props) => {
    return (
        <Box justify="center" align="center" m="4">
            <Button size="3" variant="soft">
                Login
            </Button>
        </Box>
    );
};