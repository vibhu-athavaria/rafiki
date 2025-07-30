import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClientHeader = ({ client, onScheduleSession, onSendMessage, onAddNote }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'inactive':
        return 'bg-warning text-warning-foreground';
      case 'completed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Client Info */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="relative">
            <Image
              src={client.avatar}
              alt={client.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-border"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card flex items-center justify-center ${getStatusColor(client.status)}`}>
              <Icon name="User" size={12} />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </span>
            </div>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={14} />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={14} />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={14} />
                <span>Client since {client.joinDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            iconName="Calendar"
            iconPosition="left"
            onClick={onScheduleSession}
          >
            Schedule Session
          </Button>
          <Button
            variant="outline"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={onSendMessage}
          >
            Send Message
          </Button>
          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            onClick={onAddNote}
          >
            Add Note
          </Button>
        </div>
      </div>

      {/* Coaching Goals */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">Current Coaching Goals</h3>
        <div className="flex flex-wrap gap-2">
          {client.goals.map((goal, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              <Icon name="Target" size={12} className="mr-1" />
              {goal}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHeader;