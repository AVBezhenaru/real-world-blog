import React from 'react';

const Error = ({ message }) => {
  return <h2 style={{ color: 'red', textAlign: 'center' }}>{`Ooops, something went wrong. Error: ${message}`}</h2>;
};

export default Error;
