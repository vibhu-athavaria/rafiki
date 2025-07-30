import React from 'react';
import Icon from '../../../components/AppIcon';

const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} className="text-muted-foreground" />
        </div>

        {/* Typing Bubble */}
        <div className="bg-card border border-border p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">AI is thinking</span>
            <div className="flex space-x-1">
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                style={{ animationDelay: '200ms' }}
              ></div>
              <div 
                className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                style={{ animationDelay: '400ms' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;