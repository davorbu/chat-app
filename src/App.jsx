// App.js
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import SendMessageForm from "./SendMessageForm";
import GetMessagesForm from "./GetMessagesForm";
import MessageList from "./MessageList";
import LoginForm from "./LoginForm";
import axios from "axios";

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
      const response = await axios.get("https://localhost:7295/api/Chat/get-messages?roomId=1", {
        headers: {
          Authorization: `Bearer ${user?.Token}`,
        },
      });

      if (response.status === 200) { // Dodano provjeravanje statusa odgovora
        setMessages(response.data);
      }
    } catch (error) {
      console.error("An error occurred while getting the messages.", error);
      if (error.response && error.response.status === 401) { // Izmenjen način provere statusa greške
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
