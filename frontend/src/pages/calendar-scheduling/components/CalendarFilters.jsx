import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CalendarFilters = ({ filters, onFiltersChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const sessionTypes = [
    { id: 'coaching', label: 'Coaching Sessions', color: 'bg-blue-500' },
    { id: 'consultation', label: 'Consultations', color: 'bg-green-500' },
    { id: 'workshop', label: 'Workshops', color: 'bg-purple-500' },
    { id: 'assessment', label: 'Assessments', color: 'bg-orange-500' }
  ];

  const sessionStatuses = [
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'completed', label: 'Completed' }
  ];

  const clients = [
    { id: 'sarah-johnson', label: 'Sarah Johnson' },
    { id: 'michael-chen', label: 'Michael Chen' },
    { id: 'emily-davis', label: 'Emily Davis' },
    { id: 'david-wilson', label: 'David Wilson' },
    { id: 'lisa-anderson', label: 'Lisa Anderson' }
  ];

  const handleTypeChange = (typeId, checked) => {
    const newTypes = checked 
      ? [...filters.types, typeId]
      : filters.types.filter(t => t !== typeId);
    onFiltersChange({ ...filters, types: newTypes });
  };

  const handleStatusChange = (statusId, checked) => {
    const newStatuses = checked 
      ? [...filters.statuses, statusId]
      : filters.statuses.filter(s => s !== statusId);
    onFiltersChange({ ...filters, statuses: newStatuses });
  };

  const handleClientChange = (clientId, checked) => {
    const newClients = checked 
      ? [...filters.clients, clientId]
      : filters.clients.filter(c => c !== clientId);
    onFiltersChange({ ...filters, clients: newClients });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      types: [],
      statuses: [],
      clients: [],
      dateRange: null
    });
  };

  const hasActiveFilters = filters.types.length > 0 || filters.statuses.length > 0 || filters.clients.length > 0;

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8"
          >
            <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={16} />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Schedule Session
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Block Time
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Availability
              </Button>
            </div>
          </div>

          {/* Session Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Session Types</h4>
            <div className="space-y-2">
              {sessionTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={filters.types.includes(type.id)}
                    onChange={(e) => handleTypeChange(type.id, e.target.checked)}
                  />
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded ${type.color}`}></div>
                    <span className="text-sm text-foreground">{type.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Status */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Status</h4>
            <div className="space-y-2">
              {sessionStatuses.map((status) => (
                <div key={status.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={filters.statuses.includes(status.id)}
                    onChange={(e) => handleStatusChange(status.id, e.target.checked)}
                  />
                  <span className="text-sm text-foreground">{status.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clients */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Clients</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={filters.clients.includes(client.id)}
                    onChange={(e) => handleClientChange(client.id, e.target.checked)}
                  />
                  <span className="text-sm text-foreground">{client.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Sync */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground">Calendar Sync</h4>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start"
              >
                <div className="flex items-center space-x-2">
                  <span>Google Calendar</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start"
              >
                <div className="flex items-center space-x-2">
                  <span>Outlook Calendar</span>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarFilters;