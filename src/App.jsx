import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import SendMessageForm from "./SendMessageForm";
import GetMessagesForm from "./GetMessagesForm";
import MessageList from "./MessageList";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    try {
      const response = await fetch("https://localhost:7295/api/Chat/get-messages?roomId=1");
      const data = await response.json();
      if (!data.error) {
        setMessages(data);
      }
    } catch (error) {
      console.error("An error occurred while getting the messages.", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <SendMessageForm onSendMessage={getMessages} />
      <GetMessagesForm onGetMessages={setMessages} />
      <MessageList messages={messages} />
    </Container>
  );
}

export default App;
