import React from 'react';

const User = ({ provider, profile, onLogout }) => {
  return (
    <div>
      <h2>User Information</h2>
      <p>Provider: {provider}</p>
      <p>User Name: {profile.name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default User;