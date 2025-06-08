// PrivateRoute.js
import React from 'react';
import { navigate, useLocation } from '@reach/router';

const PrivateRoute = ({ component: Component, isLoggedIn }) => {
  const location = useLocation();

  if (!isLoggedIn) {
    navigate('/login', { state: { from: location.pathname } });
    return null;
  }

  return <Component />;
};

export default PrivateRoute;
