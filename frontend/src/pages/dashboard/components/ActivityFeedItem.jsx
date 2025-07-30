import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeedItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'session_completed':
        return 'CheckCircle';
      case 'client_added':
        return 'UserPlus';
      case 'invoice_created':
        return 'FileText';
      case 'payment_received':
        return 'DollarSign';
      case 'session_scheduled':
        return 'Calendar';
      case 'note_added':
        return 'Edit';
      case 'goal_achieved':
        return 'Target';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'session_completed':
      case 'payment_received': case'goal_achieved':
        return 'text-success';
      case 'client_added': case'session_scheduled':
        return 'text-primary';
      case 'invoice_created': case'note_added':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg transition-colors duration-200">
      <div className={`p-2 rounded-full bg-muted ${getActivityColor(activity.type)}`}>
        <Icon name={getActivityIcon(activity.type)} size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">
          <span className="font-medium">{activity.title}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {activity.description}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {formatTimeAgo(activity.timestamp)}
        </p>
      </div>
      {activity.amount && (
        <div className="text-sm font-medium text-success">
          ${activity.amount}
        </div>
      )}
    </div>
  );
};

export default ActivityFeedItem;