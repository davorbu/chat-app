import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

function SendMessageForm({ onSendMessage }) {
  const [userId, setUserId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [postStatus, setPostStatus] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post(`https://localhost:7295/api/Chat/send-message?userId=${userId}&roomId=${roomId}&messageText=${messageText}`);
      setPostStatus('Message sent successfully');
      onSendMessage();  // After sending a message, retrieve all messages
    } catch (error) {
      setPostStatus('Error sending message');
    }
  };

  return (
    <Box sx={{ margin: '20px 0' }}>
      <h1>Send Message</h1>
      <TextField label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} fullWidth />
	  <br/>
	  <br/>
      <TextField label="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} fullWidth />
	  <br/>
	  <br/>
      <TextField label="Message Text" value={messageText} onChange={(e) => setMessageText(e.target.value)} fullWidth />
	  <br/>
	  <br/>
      <Button variant="contained" onClick={handleSendMessage}>Send message</Button>
      <p>{postStatus}</p>
    </Box>
  );
}

export default SendMessageForm;
