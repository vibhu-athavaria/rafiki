import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistantWidget from '../../components/ui/AIAssistantWidget';
import CalendarGrid from './components/CalendarGrid';
import UpcomingSessions from './components/UpcomingSessions';
import CalendarFilters from './components/CalendarFilters';
import DayDetailsPanel from './components/DayDetailsPanel';
import ViewToggle from './components/ViewToggle';
import ScheduleSessionModal from './components/ScheduleSessionModal';

const CalendarScheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState('month');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filters, setFilters] = useState({
    types: [],
    statuses: [],
    clients: [],
    dateRange: null
  });

  // Mock sessions data
  const [sessions, setSessions] = useState([
    {
      id: 1,
      clientId: 'sarah-johnson',
      clientName: 'Sarah Johnson',
      clientAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      date: new Date(2025, 6, 31),
      time: '10:00 AM',
      type: 'coaching',
      status: 'confirmed',
      location: 'Online',
      duration: 60,
      hasReminder: true,
      isRecurring: true,
      notes: 'Focus on career transition goals'
    },
    {
      id: 2,
      clientId: 'michael-chen',
      clientName: 'Michael Chen',
      clientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      date: new Date(2025, 6, 31),
      time: '02:00 PM',
      type: 'consultation',
      status: 'confirmed',
      location: 'Office',
      duration: 45,
      hasReminder: true,
      isRecurring: false,
      notes: 'Initial consultation for leadership coaching'
    },
    {
      id: 3,
      clientId: 'emily-davis',
      clientName: 'Emily Davis',
      clientAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      date: new Date(2025, 7, 1),
      time: '09:30 AM',
      type: 'coaching',
      status: 'pending',
      location: 'Online',
      duration: 60,
      hasReminder: false,
      isRecurring: true,
      notes: 'Work-life balance strategies'
    },
    {
      id: 4,
      clientId: 'david-wilson',
      clientName: 'David Wilson',
      clientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      date: new Date(2025, 7, 2),
      time: '11:00 AM',
      type: 'workshop',
      status: 'confirmed',
      location: 'Conference Room',
      duration: 120,
      hasReminder: true,
      isRecurring: false,
      notes: 'Team building workshop for leadership team'
    },
    {
      id: 5,
      clientId: 'lisa-anderson',
      clientName: 'Lisa Anderson',
      clientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      date: new Date(2025, 7, 3),
      time: '03:30 PM',
      type: 'coaching',
      status: 'confirmed',
      location: 'Online',
      duration: 60,
      hasReminder: true,
      isRecurring: true,
      notes: 'Executive presence and communication skills'
    }
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSessionClick = (session) => {
    setSelectedDate(new Date(session.date));
  };

  const handleScheduleSession = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsScheduleModalOpen(true);
  };

  const handleEditSession = (session) => {
    // Handle edit session logic
    console.log('Edit session:', session);
  };

  const handleScheduleSubmit = (sessionData) => {
    const newSession = {
      id: sessions.length + 1,
      ...sessionData,
      status: 'confirmed',
      hasReminder: sessionData.sendReminder,
      clientName: getClientName(sessionData.clientId),
      clientAvatar: getClientAvatar(sessionData.clientId)
    };
    
    setSessions(prev => [...prev, newSession]);
  };

  const getClientName = (clientId) => {
    const clientNames = {
      'sarah-johnson': 'Sarah Johnson',
      'michael-chen': 'Michael Chen',
      'emily-davis': 'Emily Davis',
      'david-wilson': 'David Wilson',
      'lisa-anderson': 'Lisa Anderson'
    };
    return clientNames[clientId] || 'Unknown Client';
  };

  const getClientAvatar = (clientId) => {
    const clientAvatars = {
      'sarah-johnson': 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      'michael-chen': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      'emily-davis': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      'david-wilson': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      'lisa-anderson': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
    };
    return clientAvatars[clientId] || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150';
  };

  // Filter sessions based on active filters
  const filteredSessions = sessions.filter(session => {
    if (filters.types.length > 0 && !filters.types.includes(session.type)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(session.status)) return false;
    if (filters.clients.length > 0 && !filters.clients.includes(session.clientId)) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Calendar & Scheduling - Rafiki</title>
        <meta name="description" content="Manage appointments, sync calendars, and automate session reminders with Rafiki's integrated scheduling interface." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        
        <main className="lg:ml-72 pt-16">
          <div className="p-6 space-y-6">
            <div className="flex flex-col space-y-4">
              <Breadcrumb />
              
              {/* Page Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Calendar & Scheduling</h1>
                  <p className="text-muted-foreground">
                    Manage appointments and sync with external calendars
                  </p>
                </div>
                <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Filters and Upcoming Sessions */}
              <div className="lg:col-span-1 space-y-6">
                <CalendarFilters filters={filters} onFiltersChange={setFilters} />
                <UpcomingSessions 
                  sessions={filteredSessions} 
                  onSessionClick={handleSessionClick} 
                />
              </div>

              {/* Main Calendar */}
              <div className="lg:col-span-2">
                <CalendarGrid
                  currentDate={currentDate}
                  setCurrentDate={setCurrentDate}
                  sessions={filteredSessions}
                  onDateSelect={handleDateSelect}
                  selectedDate={selectedDate}
                  viewMode={currentView}
                />
              </div>

              {/* Right Panel - Day Details */}
              <div className="lg:col-span-1">
                <DayDetailsPanel
                  selectedDate={selectedDate}
                  sessions={filteredSessions}
                  onScheduleSession={handleScheduleSession}
                  onEditSession={handleEditSession}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Schedule Session Modal */}
        <ScheduleSessionModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSchedule={handleScheduleSubmit}
        />

        <AIAssistantWidget />
      </div>
    </>
  );
};

export default CalendarScheduling;