import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClientSidebar = ({ stats, upcomingSessions, paymentAlerts }) => {
  const statCards = [
    {
      title: 'Total Clients',
      value: stats.totalClients,
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      color: 'text-primary'
    },
    {
      title: 'Active Clients',
      value: stats.activeClients,
      change: '+8%',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'text-success'
    },
    {
      title: 'This Month Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+15%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'text-accent'
    },
    {
      title: 'Avg. Session Rating',
      value: stats.avgRating,
      change: '+0.2',
      changeType: 'positive',
      icon: 'Star',
      color: 'text-warning'
    }
  ];

  const formatSessionTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="BarChart3" size={18} className="mr-2" />
          Overview
        </h3>
        <div className="space-y-4">
          {statCards.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-md bg-muted flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon} size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </div>
              <span className={`text-xs font-medium ${stat.changeType === 'positive' ? 'text-success' : 'text-error'}`}>
                {stat.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground flex items-center">
            <Icon name="Calendar" size={18} className="mr-2" />
            Upcoming Sessions
          </h3>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={14} className="mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-primary">
                  {session.clientName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{session.clientName}</p>
                <p className="text-xs text-muted-foreground">{formatSessionTime(session.scheduledAt)}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Icon name="Video" size={12} />
                </Button>
                <Button variant="ghost" size="icon" className="w-6 h-6">
                  <Icon name="MessageCircle" size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" fullWidth className="mt-3">
          View All Sessions
        </Button>
      </div>

      {/* Payment Alerts */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="CreditCard" size={18} className="mr-2" />
          Payment Status
        </h3>
        <div className="space-y-3">
          {paymentAlerts.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-md border-l-4 ${
              alert.type === 'overdue' ? 'bg-error/5 border-error' :
              alert.type === 'pending'? 'bg-warning/5 border-warning' : 'bg-success/5 border-success'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-foreground">{alert.clientName}</p>
                <span className={`text-xs font-medium ${
                  alert.type === 'overdue' ? 'text-error' :
                  alert.type === 'pending'? 'text-warning' : 'text-success'
                }`}>
                  ${alert.amount}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{alert.description}</p>
              {alert.type === 'overdue' && (
                <Button variant="ghost" size="sm" className="mt-2 text-error hover:text-error">
                  <Icon name="Bell" size={12} className="mr-1" />
                  Send Reminder
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" fullWidth className="mt-3">
          View Payment Dashboard
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Zap" size={18} className="mr-2" />
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="UserPlus" size={14} className="mr-2" />
            Add New Client
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="Calendar" size={14} className="mr-2" />
            Schedule Session
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="FileText" size={14} className="mr-2" />
            Create Invoice
          </Button>
          <Button variant="outline" size="sm" fullWidth>
            <Icon name="MessageSquare" size={14} className="mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientSidebar;