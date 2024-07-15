import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { useMediaQuery, Button } from '@mui/material';

// Function to verify the token
const sendToken = (userData) => {
  return axios({
    method: 'GET',
    url: `${process.env.REACT_APP_MERAKI_URL}/users/me`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${userData.token}`,
    },
  });
};

const GoogleLoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const onSignIn = async (googleUser) => {
    console.log('Google login successful:', googleUser);
    setLoading(true);
    const token = googleUser.credential;
    console.log(token);

    try {
      const response = await axios.post('https://merd-api.merakilearn.org/users/auth/google', {
        idToken: token,
        mode: 'web',
      });

      console.log('Successful response:', response);
      const userData = { token: response.data.token };
      const tokenVerificationResponse = await sendToken(userData);

      console.log('Token verification response:', tokenVerificationResponse);
      setLoading(false);
      // Perform further actions upon successful login and token verification
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      // Handle error scenarios
    }
  };



  const onGoogleLoginFail = (errorResponse) => {
    console.error('Google login failed:', errorResponse);
    setLoading(false);
    // Handle failure scenarios
  };

  const isActive = useMediaQuery('(max-width:600px)');
  const isActiveIpad = useMediaQuery('(max-width:768px)');

  return (
    <GoogleLogin
      clientId="303405332985-lleqju488en3mjv74rhb49k10um5a5cp.apps.googleusercontent.com" // Replace with your actual client ID
      buttonText="Log In with Google"
      onSuccess={onSignIn}
      onFailure={onGoogleLoginFail}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          variant="contained"
          onClick={renderProps.onClick}
          style={{
            backgroundColor: '#ff5c0a',
            color: '#fff',
            fontFamily: 'cursive',
            border: 'none',
            fontSize: '18px',
            padding: '15px',
            borderRadius: '50px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            margin: '10px 0',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          Log In with Google
        </Button>
      )}
    />
  );
};

export default GoogleLoginComponent;
