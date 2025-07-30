import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistantWidget from '../../components/ui/AIAssistantWidget';
import ClientHeader from './components/ClientHeader';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import SessionsTab from './components/SessionsTab';
import ProgressTab from './components/ProgressTab';
import FilesTab from './components/FilesTab';
import BillingTab from './components/BillingTab';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const location = useLocation();

  // Mock client data - in real app, this would come from API/props
  const client = {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    status: 'active',
    joinDate: 'December 15, 2024',
    program: 'Executive Leadership Development',
    startDate: '2024-12-15',
    frequency: 'Weekly (1 hour sessions)',
    preferredCommunication: 'Video Call',
    timezone: 'EST (UTC-5)',
    goals: [
      'Leadership Development',
      'Public Speaking',
      'Team Management',
      'Strategic Thinking'
    ]
  };

  const handleScheduleSession = () => {
    // Handle schedule session logic
    console.log('Schedule session for:', client.name);
  };

  const handleSendMessage = () => {
    // Handle send message logic
    console.log('Send message to:', client.name);
  };

  const handleAddNote = () => {
    // Handle add note logic
    console.log('Add note for:', client.name);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab client={client} />;
      case 'sessions':
        return <SessionsTab client={client} />;
      case 'progress':
        return <ProgressTab client={client} />;
      case 'files':
        return <FilesTab client={client} />;
      case 'billing':
        return <BillingTab client={client} />;
      default:
        return <OverviewTab client={client} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-72 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <ClientHeader
            client={client}
            onScheduleSession={handleScheduleSession}
            onSendMessage={handleSendMessage}
            onAddNote={handleAddNote}
          />
          
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          
          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>

      <AIAssistantWidget />
    </div>
  );
};

export default ClientProfile;