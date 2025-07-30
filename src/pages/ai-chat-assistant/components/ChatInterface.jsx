import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import MessageBubble from './MessageBubble';
import QuickActions from './QuickActions';
import TypingIndicator from './TypingIndicator';

const ChatInterface = ({ 
  activeConversation, 
  onSendMessage, 
  isTyping,
  onExportConversation 
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  useEffect(() => {
    if (activeConversation && inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeConversation]);

  const handleSendMessage = () => {
    if (!message.trim() && attachments.length === 0) return;

    const newMessage = {
      content: message,
      attachments: attachments,
      timestamp: new Date()
    };

    onSendMessage(newMessage);
    setMessage('');
    setAttachments([]);
    setShowQuickActions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileAttachment = (e) => {
    const files = Array.from(e.target.files);
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleQuickAction = (action) => {
    setMessage(action.prompt);
    setShowQuickActions(false);
    inputRef.current?.focus();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="Bot" size={48} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Welcome to AI Chat Assistant
          </h2>
          <p className="text-muted-foreground mb-6">
            Get personalized coaching insights, session analysis, and strategic guidance. 
            Start a new conversation to begin receiving AI-powered coaching support.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Sparkles" size={16} />
              <span>Context-aware coaching insights</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Brain" size={16} />
              <span>Session analysis and recommendations</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Target" size={16} />
              <span>Goal tracking and progress monitoring</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Bot" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{activeConversation.title}</h3>
              <p className="text-sm text-muted-foreground">
                AI Coaching Assistant • Online
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onExportConversation}
              title="Export Conversation"
            >
              <Icon name="Download" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              title="More Options"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeConversation.messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isUser={msg.type === 'user'}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {showQuickActions && activeConversation.messages.length <= 1 && (
          <QuickActions onActionSelect={handleQuickAction} />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border p-4">
        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="mb-4 space-y-2">
            {attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center justify-between bg-muted p-3 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {attachment.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeAttachment(attachment.id)}
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Input Controls */}
        <div className="flex items-end space-x-3">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about coaching strategies, client insights, or session analysis..."
              className="w-full px-4 py-3 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none transition-all duration-200"
              rows={message.split('\n').length || 1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileAttachment}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.mp3,.mp4,.wav"
            />
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              title="Attach File"
            >
              <Icon name="Paperclip" size={16} />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!message.trim() && attachments.length === 0}
              iconName="Send"
              size="icon"
            />
          </div>
        </div>

        {/* Input Hints */}
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{message.length}/2000</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;