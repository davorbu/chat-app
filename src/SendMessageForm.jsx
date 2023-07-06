import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box } from '@mui/material';

function SendMessageForm({ onSendMessage, token }) {
  const [roomId, setRoomId] = useState('');
  const [messageText, setMessageText] = useState('');
  const [postStatus, setPostStatus] = useState('');

  const handleSendMessage = async () => {
    try {
      await axios.post(`https://localhost:7295/api/Chat/send-message`,
      {
        roomId: roomId,
        messageText:messageText
      }, 
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setPostStatus('Message sent successfully');
      onSendMessage();  
    } catch (error) {
      setPostStatus('Error sending message');
    }
  };

  return (
    <Box sx={{ margin: '20px 0' }}>
      <h1>Send Message</h1>
      <TextField label="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} fullWidth />
      <br/>
      <TextField label="Message Text" value={messageText} onChange={(e) => setMessageText(e.target.value)} fullWidth />
      <br/>
      <Button variant="contained" onClick={handleSendMessage}>Send message</Button>
      <p>{postStatus}</p>
    </Box>
  );
}

export default SendMessageForm;
