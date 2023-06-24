import { Typography, Card, CardContent } from '@mui/material';

function MessageList({ messages }) {
  // Ako messages nije definirano, koristi prazan niz
  const messageList = messages || [];

  return (
    <div>
      <Typography variant="h6">Messages:</Typography>
      {messageList.map((message) => (
        <Card key={message.messageId} sx={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="body1">
              Message Id: {message.messageId}
            </Typography>
            <Typography variant="body1">UserId: {message.userId}</Typography>
            <Typography variant="body1">Message: {message.text}</Typography>
            <Typography variant="body1">
              Created: {new Date(message.created).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default MessageList;
