import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DayDetailsPanel = ({ selectedDate, sessions, onScheduleSession, onEditSession }) => {
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  if (!selectedDate) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Date</h3>
          <p className="text-muted-foreground">
            Click on a date in the calendar to view details and available time slots.
          </p>
        </div>
      </div>
    );
  }

  const selectedDateSessions = sessions.filter(session => 
    new Date(session.date).toDateString() === selectedDate.toDateString()
  ).sort((a, b) => a.time.localeCompare(b.time));

  const formatDate = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === new Date(today.getTime() + 86400000).toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const availableTimeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ];

  const bookedTimes = selectedDateSessions.map(session => session.time);
  const freeTimeSlots = availableTimeSlots.filter(time => !bookedTimes.includes(time));

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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <Icon name="CheckCircle" size={16} className="text-green-600" />;
      case 'pending':
        return <Icon name="Clock" size={16} className="text-amber-600" />;
      case 'cancelled':
        return <Icon name="XCircle" size={16} className="text-red-600" />;
      default:
        return <Icon name="Circle" size={16} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            {formatDate(selectedDate)}
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedDateSessions.length} session{selectedDateSessions.length !== 1 ? 's' : ''} scheduled
          </p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          onClick={() => setShowTimeSlots(!showTimeSlots)}
        >
          Schedule
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* Scheduled Sessions */}
        {selectedDateSessions.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Scheduled Sessions</h4>
            {selectedDateSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors duration-200"
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
                    <h5 className="font-medium text-foreground truncate">
                      {session.clientName}
                    </h5>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getSessionTypeColor(session.type)}`}>
                      {session.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={14} />
                      <span>{session.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon(session.status)}
                    <span className="text-xs text-muted-foreground">
                      {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEditSession(session)}
                    className="w-8 h-8"
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Available Time Slots */}
        {showTimeSlots && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Available Time Slots</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTimeSlots(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
              {freeTimeSlots.map((time) => (
                <Button
                  key={time}
                  variant="outline"
                  size="sm"
                  onClick={() => onScheduleSession(selectedDate, time)}
                  className="justify-center"
                >
                  {time}
                </Button>
              ))}
            </div>
            
            {freeTimeSlots.length === 0 && (
              <div className="text-center py-4">
                <Icon name="Clock" size={32} className="mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">No available time slots</p>
              </div>
            )}
          </div>
        )}

        {/* Day Summary */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {selectedDateSessions.length}
              </div>
              <div className="text-xs text-muted-foreground">Sessions</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {freeTimeSlots.length}
              </div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDetailsPanel;