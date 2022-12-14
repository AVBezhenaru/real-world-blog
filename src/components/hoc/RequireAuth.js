import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const username = useSelector((state) => state.user.username);

  if (!username) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default RequireAuth;
