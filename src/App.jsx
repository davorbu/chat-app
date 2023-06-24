import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import SendMessageForm from "./SendMessageForm";
import GetMessagesForm from "./GetMessagesForm";
import MessageList from "./MessageList";
import LoginForm from "./LoginForm";

function App() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      getMessages();
    }
  }, [user]);

  const getMessages = async () => {
    try {
      const response = await fetch("https://localhost:7295/api/Chat/get-messages?roomId=1", {
        headers: {
          Authorization: `Bearer ${user?.Token}`,
        },
      });
      const data = await response.json();
      if (!data.error) {
        setMessages(data);
      }
    } catch (error) {
      console.error("An error occurred while getting the messages.", error);
      if (error.status === 401) { 
        setUser(null);
        localStorage.removeItem('user');
      }
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <Container maxWidth="sm">
      {!user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <>
          <SendMessageForm onSendMessage={getMessages} token={user.Token} />
          <GetMessagesForm onGetMessages={setMessages} token={user.Token} />
          <MessageList messages={messages} />
        </>
      )}
    </Container>
  );
}

export default App;
