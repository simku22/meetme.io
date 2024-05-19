import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';

async function PrivateRoute({ component: Component, ...rest }) {
    let response = false;
    response = await axios.get('http://localhost:3000/signin')
    .catch((error) => {
        console.log(error);
    })
    response = response.data.status; // needs to be removed but for now only this works
    return (
        <Route
            {...rest}
            render={(props) =>
            response ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
    }

export default PrivateRoute;