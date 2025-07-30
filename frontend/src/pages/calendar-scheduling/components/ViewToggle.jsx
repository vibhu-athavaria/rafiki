import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'month', label: 'Month', icon: 'Calendar' },
    { id: 'week', label: 'Week', icon: 'CalendarDays' },
    { id: 'day', label: 'Day', icon: 'CalendarRange' },
    { id: 'agenda', label: 'Agenda', icon: 'List' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-muted p-1 rounded-lg">
      {views.map((view) => (
        <Button
          key={view.id}
          variant={currentView === view.id ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange(view.id)}
          className={`flex items-center space-x-2 px-3 py-2 ${
            currentView === view.id 
              ? 'bg-card text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={view.icon} size={16} />
          <span className="hidden sm:inline">{view.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default ViewToggle;