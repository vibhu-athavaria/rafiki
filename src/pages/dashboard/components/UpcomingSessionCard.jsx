import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingSessionCard = ({ session }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'cancelled':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary">
              {session.clientName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h4 className="font-medium text-foreground">{session.clientName}</h4>
            <p className="text-sm text-muted-foreground">{session.sessionType}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(session.status)}`}>
          {session.status}
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{formatDate(session.date)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>{formatTime(session.date)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span>{session.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="MessageSquare" iconSize={14}>
            Message
          </Button>
          <Button variant="outline" size="sm" iconName="Phone" iconSize={14}>
            Call
          </Button>
        </div>
        <Link to={`/client-profile?id=${session.clientId}`}>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconSize={14}>
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;