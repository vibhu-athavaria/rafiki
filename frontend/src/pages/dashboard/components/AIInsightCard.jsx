import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightCard = ({ insight }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-error/10 text-error border-error/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'recommendation':
        return 'Lightbulb';
      case 'alert':
        return 'AlertTriangle';
      case 'progress':
        return 'TrendingUp';
      case 'goal':
        return 'Target';
      default:
        return 'Bot';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name={getInsightIcon(insight.type)} size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
            <p className="text-xs text-muted-foreground">{formatTimeAgo(insight.createdAt)}</p>
          </div>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(insight.priority)}`}>
          {insight.priority}
        </span>
      </div>

      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
        {insight.description}
      </p>

      {insight.clientName && (
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="User" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Related to {insight.clientName}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Icon name="Bot" size={14} className="text-primary" />
          <span className="text-xs text-primary font-medium">AI Generated</span>
        </div>
        <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AIInsightCard;