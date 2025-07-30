import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const UpcomingSessions = ({ sessions, onSessionClick }) => {
  const today = new Date();
  const upcomingSessions = sessions
    .filter(session => new Date(session.date) >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);

  const formatDate = (date) => {
    const sessionDate = new Date(date);
    const isToday = sessionDate.toDateString() === today.toDateString();
    const isTomorrow = sessionDate.toDateString() === new Date(today.getTime() + 86400000).toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return sessionDate.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getSessionTypeColor = (type) => {
    switch (type) {
      case 'coaching':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'consultation':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'workshop':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600';
      case 'pending':
        return 'text-amber-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Sessions</h3>
        <Button variant="ghost" size="sm" iconName="Calendar" iconPosition="left" iconSize={16}>
          View All
        </Button>
      </div>

      <div className="p-4 space-y-3">
        {upcomingSessions.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No upcoming sessions</p>
            <Button variant="outline" size="sm" className="mt-3">
              Schedule Session
            </Button>
          </div>
        ) : (
          upcomingSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors duration-200"
              onClick={() => onSessionClick(session)}
            >
              <div className="flex-shrink-0">
                <Image
                  src={session.clientAvatar}
                  alt={session.clientName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-foreground truncate">
                    {session.clientName}
                  </h4>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSessionTypeColor(session.type)}`}>
                    {session.type}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{session.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {session.hasReminder && (
                      <Icon name="Bell" size={14} className="text-primary" />
                    )}
                    {session.isRecurring && (
                      <Icon name="Repeat" size={14} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button variant="ghost" size="icon" className="w-8 h-8">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {upcomingSessions.length > 0 && (
        <div className="p-4 border-t border-border">
          <Button variant="outline" fullWidth>
            View All Sessions
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingSessions;