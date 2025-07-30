import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConversationSidebar = ({ 
  conversations, 
  activeConversation, 
  onConversationSelect, 
  onNewConversation,
  isCollapsed,
  onToggleCollapse 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedConversations = filteredConversations.reduce((groups, conv) => {
    const date = conv.lastMessage.toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(conv);
    return groups;
  }, {});

  const formatDateGroup = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground">Conversations</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="flex-shrink-0"
          >
            <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
          </Button>
        </div>

        {!isCollapsed && (
          <>
            {/* New Conversation Button */}
            <Button
              onClick={onNewConversation}
              className="w-full mb-4"
              iconName="Plus"
              iconPosition="left"
            >
              New Conversation
            </Button>

            {/* Search */}
            <div className="relative">
              <Icon
                name="Search"
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          </>
        )}
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {isCollapsed ? (
          <div className="p-2 space-y-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onNewConversation}
              className="w-full"
              title="New Conversation"
            >
              <Icon name="Plus" size={20} />
            </Button>
            {conversations.slice(0, 5).map((conv) => (
              <Button
                key={conv.id}
                variant={activeConversation?.id === conv.id ? 'default' : 'ghost'}
                size="icon"
                onClick={() => onConversationSelect(conv)}
                className="w-full"
                title={conv.title}
              >
                <Icon name="MessageCircle" size={20} />
              </Button>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-4">
            {Object.entries(groupedConversations).map(([dateString, convs]) => (
              <div key={dateString}>
                <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2">
                  {formatDateGroup(dateString)}
                </h3>
                <div className="space-y-1">
                  {convs.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => onConversationSelect(conv)}
                      className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
                        activeConversation?.id === conv.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-sm truncate flex-1">
                          {conv.title}
                        </h4>
                        <span className={`text-xs ml-2 flex-shrink-0 ${
                          activeConversation?.id === conv.id
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        }`}>
                          {conv.lastMessage.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      <p className={`text-xs truncate ${
                        activeConversation?.id === conv.id
                          ? 'text-primary-foreground/80'
                          : 'text-muted-foreground'
                      }`}>
                        {conv.preview}
                      </p>
                      {conv.unreadCount > 0 && (
                        <div className="flex justify-end mt-1">
                          <span className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {conv.unreadCount}
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {filteredConversations.length === 0 && (
              <div className="text-center py-8">
                <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-sm">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </p>
                <p className="text-muted-foreground text-xs mt-1">
                  {searchQuery ? 'Try a different search term' : 'Start a new conversation to get coaching insights'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationSidebar;