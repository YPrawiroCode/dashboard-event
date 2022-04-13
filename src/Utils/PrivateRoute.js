import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Navigate to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;