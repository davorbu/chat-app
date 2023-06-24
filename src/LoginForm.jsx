import React, {useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  

  const handleLogin = async () => {
    try {
		console.log(username, password)
      axios.post(`https://localhost:7295/api/Login`, {
        email: username,
        password: password,
      })
      .then((response) => {
        onLogin(response.data);
        setLoginStatus('');
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        setLoginStatus('Error logging in');
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
      <p>{loginStatus}</p>
    </div>
  );
}

export default LoginForm;
