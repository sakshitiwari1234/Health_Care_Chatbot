import React, { useState } from 'react';
import './App.css';
const logo = require('./logo.jpg');

const qaData = [

  { question: 'What are the symptoms of COVID-19?', answer: 'Common symptoms include fever, cough, and difficulty breathing.' },
  { question: 'What are the symptoms of COVID-19?', answer: 'Common symptoms include fever, cough, and difficulty breathing.' },
  { question: 'How can I protect myself from COVID-19?', answer: 'To protect yourself, practice good hygiene, wear masks, and maintain social distancing.' },
  { question: 'What is the recommended daily water intake?', answer: 'The recommended daily water intake varies, but a common guideline is eight 8-ounce glasses per day.' },
  { question: 'How many hours of sleep should I get?', answer: 'Most adults need 7-9 hours of sleep per night for optimal health.' },
  { question: 'What is a balanced diet?', answer: 'A balanced diet includes a variety of fruits, vegetables, whole grains, proteins, and healthy fats.' },
  { question: 'How often should I exercise?', answer: 'It is recommended to get at least 150 minutes of moderate-intensity exercise or 75 minutes of vigorous-intensity exercise per week.' },
  // Add more questions and answers as needed
];

function App() {
    const speakText = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
      };
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userQuestions, setUserQuestions] = useState([]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {

    speakText("Hello");


    if (userInput.trim() === '') return;

    const userMessage = { user: true, message: userInput, timestamp: new Date().toLocaleTimeString() };
    setChatHistory([...chatHistory, userMessage]);

    const botMessage = getBotResponse(userInput);
    const botResponse = { user: false, message: botMessage, timestamp: new Date().toLocaleTimeString() };
    setChatHistory([...chatHistory, botResponse]);

    setUserQuestions([...userQuestions, userInput]); // Store user questions
    setUserInput('');
  };

  const getBotResponse = (userMessage) => {
    const lowerCaseUserMessage = userMessage.toLowerCase();
    let response = "I'm sorry, I didn't understand. Can you please ask another question?";

    // Check each question in qaData and find a matching response
    qaData.forEach((qa) => {
      if (lowerCaseUserMessage.includes(qa.question.toLowerCase())) {
        response = qa.answer;
      }
    });
    speakText(response);
    return response;
  };

  return (
    <>
    <div className="app">
      <div className="header">
        <img src={logo} alt="Hackathon Logo" className="logo" />
        <h1>HealthBot Chat</h1>
      </div>
      <div className="chat-container">
        <div className="chat">
          {chatHistory.map((msg, index) => (
            <div key={index} className={msg.user ? 'user-message' : 'bot-message'}>
              <div className="message">
                <span className="timestamp">{msg.timestamp}</span>
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your question..."
            value={userInput}
            onChange={handleInputChange}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <div className="user-questions">
        <h2>User Questions</h2>
        <ul>
          {userQuestions.map((question, index) => (
            <li key={index}>{question}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default App;
