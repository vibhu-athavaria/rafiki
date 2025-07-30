import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AIAssistantWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI coaching assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const location = useLocation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const getContextualSuggestions = () => {
    const suggestions = {
      '/dashboard': [
        'Show me insights about my coaching practice',
        'What are my top performing metrics?',
        'Help me identify areas for improvement'
      ],
      '/client-management': [
        'How can I better organize my client roster?',
        'Suggest follow-up strategies for inactive clients',
        'Help me create client engagement templates'
      ],
      '/client-profile': [
        'Analyze this client\'s progress patterns',
        'Suggest personalized coaching approaches',
        'Help me prepare for the next session'
      ],
      '/calendar-scheduling': [
        'Optimize my scheduling for better work-life balance',
        'Suggest ideal session timing patterns',
        'Help me manage scheduling conflicts'
      ],
      '/ai-chat-assistant': [
        'What are your key capabilities?',
        'How can you help improve my coaching?',
        'Show me advanced AI features'
      ]
    };

    return suggestions[location.pathname] || [
      'How can I improve my coaching effectiveness?',
      'Help me with client relationship strategies',
      'Provide insights on coaching best practices'
    ];
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'That\'s a great question! Based on your current client data, I can see some interesting patterns that might help.',
        'I\'d be happy to help you with that. Let me analyze your coaching sessions and provide some personalized recommendations.',
        'Excellent point! Here are some evidence-based strategies that align with your coaching style and client needs.',
        'I understand what you\'re looking for. Based on successful coaching practices, here are some actionable insights.'
      ];

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(suggestion);
    inputRef.current?.focus();
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-[1300]">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse-gentle"
          size="icon"
        >
          <Icon name="Bot" size={24} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[1300]">
      <div
        className={`bg-card border border-border rounded-lg shadow-lg transition-all duration-300 ${
          isMinimized ? 'w-80 h-14' : 'w-80 h-96 sm:w-96 sm:h-[500px]'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Bot" size={20} />
            <span className="font-medium">AI Assistant</span>
            {isTyping && (
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-primary-foreground rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-primary-foreground rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8"
            >
              <Icon name={isMinimized ? 'Maximize2' : 'Minimize2'} size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-primary-foreground hover:bg-primary-foreground/20 w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto h-64 sm:h-80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.type === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs opacity-70 mt-1">{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick suggestions:</p>
                <div className="space-y-1">
                  {getContextualSuggestions().slice(0, 2).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left text-xs p-2 bg-muted hover:bg-muted/80 rounded text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about coaching..."
                  className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  size="icon"
                  className="flex-shrink-0"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AIAssistantWidget;