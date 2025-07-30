import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ScheduleSessionModal = ({ isOpen, onClose, selectedDate, selectedTime, onSchedule }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    sessionType: '',
    duration: '60',
    location: 'online',
    notes: '',
    sendReminder: true,
    isRecurring: false,
    recurringPattern: 'weekly'
  });

  const clients = [
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'michael-chen', label: 'Michael Chen' },
    { value: 'emily-davis', label: 'Emily Davis' },
    { value: 'david-wilson', label: 'David Wilson' },
    { value: 'lisa-anderson', label: 'Lisa Anderson' }
  ];

  const sessionTypes = [
    { value: 'coaching', label: 'Coaching Session' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'assessment', label: 'Assessment' }
  ];

  const durations = [
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const locations = [
    { value: 'online', label: 'Online (Zoom/Meet)' },
    { value: 'office', label: 'Office' },
    { value: 'client-location', label: 'Client Location' },
    { value: 'phone', label: 'Phone Call' }
  ];

  const recurringPatterns = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule({
      ...formData,
      date: selectedDate,
      time: selectedTime
    });
    onClose();
    setFormData({
      clientId: '',
      sessionType: '',
      duration: '60',
      location: 'online',
      notes: '',
      sendReminder: true,
      isRecurring: false,
      recurringPattern: 'weekly'
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1400] flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Schedule Session</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Date & Time Display */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="font-medium">
                  {selectedDate?.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="font-medium">{selectedTime}</span>
              </div>
            </div>
          </div>

          {/* Client Selection */}
          <Select
            label="Client"
            required
            options={clients}
            value={formData.clientId}
            onChange={(value) => handleInputChange('clientId', value)}
            placeholder="Select a client"
          />

          {/* Session Type */}
          <Select
            label="Session Type"
            required
            options={sessionTypes}
            value={formData.sessionType}
            onChange={(value) => handleInputChange('sessionType', value)}
            placeholder="Select session type"
          />

          {/* Duration */}
          <Select
            label="Duration"
            options={durations}
            value={formData.duration}
            onChange={(value) => handleInputChange('duration', value)}
          />

          {/* Location */}
          <Select
            label="Location"
            options={locations}
            value={formData.location}
            onChange={(value) => handleInputChange('location', value)}
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Session Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Add any notes or preparation details..."
              className="w-full px-3 py-2 text-sm bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
              rows={3}
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <Checkbox
              label="Send reminder notification"
              checked={formData.sendReminder}
              onChange={(e) => handleInputChange('sendReminder', e.target.checked)}
            />
            
            <Checkbox
              label="Make this a recurring session"
              checked={formData.isRecurring}
              onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
            />

            {formData.isRecurring && (
              <Select
                label="Recurring Pattern"
                options={recurringPatterns}
                value={formData.recurringPattern}
                onChange={(value) => handleInputChange('recurringPattern', value)}
                className="ml-6"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.clientId || !formData.sessionType}
            >
              Schedule Session
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSessionModal;