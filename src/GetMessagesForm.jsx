import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

function GetMessages({ onGetMessages }) {
  const [roomId, setRoomId] = useState('');
  const [getStatus, setGetStatus] = useState('');

  const handleGetMessages = async () => {
    try {
      const response = await axios.get(`https://localhost:7295/api/Chat/get-messages?roomId=${roomId}`);
      onGetMessages(response.data);
      setGetStatus('');
    } catch (error) {
      setGetStatus('Error getting messages');
    }
  };

  return (
    <Box sx={{ margin: '20px 0' }}>
      <h1>Get Messages</h1>
      <TextField label="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} fullWidth />
	  <br/>
	  <br/>
      <Button variant="contained" onClick={handleGetMessages}>Get messages</Button>
      <p>{getStatus}</p>
    </Box>
  );
}

export default GetMessages;
