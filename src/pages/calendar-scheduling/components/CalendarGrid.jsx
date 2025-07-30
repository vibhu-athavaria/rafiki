import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarGrid = ({ currentDate, setCurrentDate, sessions, onDateSelect, selectedDate, viewMode, daySession }) => {
  const today = new Date();

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getSessionsForDate = (date) => {
    const dateStr = date.toDateString();
    return sessions.filter((session) =>
    new Date(session.date).toDateString() === dateStr
    );
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Previous month's trailing days
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = firstDay - 1; i >= 0; i--) {
      let day = prevMonthDays - i;
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
      days.push(
        <div
          key={`prev-${day}`}
          className="h-24 p-1 border border-border/50 bg-muted/30 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors duration-200"
          onClick={() => onDateSelect(date)}>

          <span className="text-sm">{day}</span>
        </div>
      );
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const daySessions = getSessionsForDate(date);

      days.push(
        <div
          key={day}
          className={`h-24 p-1 border border-border cursor-pointer transition-all duration-200 ${
          isToday ? 'bg-primary/10 border-primary' : 'bg-card hover:bg-muted/50'} ${
          isSelected ? 'ring-2 ring-primary' : ''}`}
          onClick={() => onDateSelect(date)}>

          <div className="flex flex-col h-full">
            <span className={`text-sm font-medium ${
            isToday ? 'text-primary' : 'text-foreground'}`
            }>
              {day}
            </span>
            <div className="flex-1 space-y-0.5 overflow-hidden">
              {daySessions.slice(0, 2).map((session, index) =>
              <div
                key={session.id}
                className={`text-xs px-1 py-0.5 rounded truncate ${
                session.type === 'coaching' ? 'bg-blue-100 text-blue-800' :
                session.type === 'consultation' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`
                }
                title={`${session.time} - ${session.clientName}`}>

                  {session.time} {session.clientName}
                </div>
              )}
              {daySessions.length > 2 &&
              <div className="text-xs text-muted-foreground">
                  +{daySession.length - 2} more
                </div>
              }
            </div>
          </div>
        </div>
      );
    }

    // Next month's leading days
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
      days.push(
        <div
          key={`next-${day}`}
          className="h-24 p-1 border border-border/50 bg-muted/30 text-muted-foreground cursor-pointer hover:bg-muted/50 transition-colors duration-200"
          onClick={() => onDateSelect(date)}>

          <span className="text-sm">{day}</span>
        </div>
      );
    }

    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];


  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(-1)}
              className="w-8 h-8">

              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="px-3">

              Today
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(1)}
              className="w-8 h-8">

              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}>

            New Session
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8">

            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {weekDays.map((day) =>
          <div
            key={day}
            className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">

              {day}
            </div>
          )}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-0 border border-border rounded-md overflow-hidden">
          {renderCalendarDays()}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 p-4 border-t border-border bg-muted/30">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-sm text-muted-foreground">Coaching</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-sm text-muted-foreground">Consultation</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span className="text-sm text-muted-foreground">Workshop</span>
        </div>
      </div>
    </div>);

};

export default CalendarGrid;