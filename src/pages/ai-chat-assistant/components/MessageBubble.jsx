import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageBubble = ({ message, isUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) return null;

    return (
      <div className="mt-3 space-y-2">
        {attachments.map((attachment, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 p-2 bg-muted/50 rounded border"
          >
            <Icon name="Paperclip" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{attachment.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderContent = (content) => {
    if (typeof content === 'string') {
      // Handle code blocks
      if (content.includes('```')) {
        const parts = content.split('```');
        return parts.map((part, index) => {
          if (index % 2 === 1) {
            return (
              <pre key={index} className="bg-muted p-3 rounded mt-2 overflow-x-auto">
                <code className="text-sm font-mono">{part.trim()}</code>
              </pre>
            );
          }
          return (
            <div key={index} className="whitespace-pre-wrap">
              {part}
            </div>
          );
        });
      }

      // Handle line breaks
      return (
        <div className="whitespace-pre-wrap">
          {content}
        </div>
      );
    }

    return content;
  };

  const shouldTruncate = message.content && message.content.length > 500;
  const displayContent = shouldTruncate && !isExpanded 
    ? message.content.substring(0, 500) + '...'
    : message.content;

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`p-4 rounded-lg ${
            isUser
              ? 'bg-primary text-primary-foreground'
              : 'bg-card border border-border text-foreground'
          }`}
        >
          {/* Message Content */}
          <div className="text-sm">
            {renderContent(displayContent)}
          </div>

          {/* Expand/Collapse Button */}
          {shouldTruncate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className={`mt-2 p-0 h-auto ${
                isUser 
                  ? 'text-primary-foreground hover:text-primary-foreground/80' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </Button>
          )}

          {/* Attachments */}
          {renderAttachments(message.attachments)}

          {/* Message Footer */}
          <div className={`flex items-center justify-between mt-2 text-xs ${
            isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            <span>{formatTimestamp(message.timestamp)}</span>
            {message.status && (
              <div className="flex items-center space-x-1">
                {message.status === 'sending' && (
                  <Icon name="Clock" size={12} />
                )}
                {message.status === 'sent' && (
                  <Icon name="Check" size={12} />
                )}
                {message.status === 'delivered' && (
                  <Icon name="CheckCheck" size={12} />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Message Actions */}
        {showActions && (
          <div className={`flex items-center space-x-1 mt-1 ${
            isUser ? 'justify-end' : 'justify-start'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => copyToClipboard(message.content)}
              className="w-6 h-6"
              title="Copy message"
            >
              <Icon name="Copy" size={12} />
            </Button>
            {!isUser && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  title="Regenerate response"
                >
                  <Icon name="RotateCcw" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                  title="Rate response"
                >
                  <Icon name="ThumbsUp" size={12} />
                </Button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'order-1 mr-3 bg-primary' : 'order-2 ml-3 bg-muted'
      }`}>
        {isUser ? (
          <span className="text-xs font-medium text-primary-foreground">You</span>
        ) : (
          <Icon name="Bot" size={16} className="text-muted-foreground" />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;