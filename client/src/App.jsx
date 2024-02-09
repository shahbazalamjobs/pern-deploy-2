import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/messages')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Hello from React</h1>
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className="message-item">{message.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
