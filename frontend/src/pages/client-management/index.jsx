import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistantWidget from '../../components/ui/AIAssistantWidget';
import ClientTable from './components/ClientTable';
import FilterToolbar from './components/FilterToolbar';
import ClientSidebar from './components/ClientSidebar';
import AddClientModal from './components/AddClientModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockClients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      coachingType: "Life Coaching",
      status: "active",
      lastSession: "2025-01-28T10:00:00Z",
      sessionCount: 12,
      progress: 75,
      paymentStatus: "paid",
      totalRevenue: 2400
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      coachingType: "Business Coaching",
      status: "active",
      lastSession: "2025-01-25T14:30:00Z",
      sessionCount: 8,
      progress: 60,
      paymentStatus: "pending",
      totalRevenue: 1600
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      coachingType: "Career Coaching",
      status: "inactive",
      lastSession: "2025-01-20T09:00:00Z",
      sessionCount: 15,
      progress: 90,
      paymentStatus: "overdue",
      totalRevenue: 3000
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      coachingType: "Executive Coaching",
      status: "active",
      lastSession: "2025-01-29T16:00:00Z",
      sessionCount: 20,
      progress: 85,
      paymentStatus: "paid",
      totalRevenue: 5000
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      coachingType: "Health & Wellness",
      status: "paused",
      lastSession: "2025-01-15T11:30:00Z",
      sessionCount: 6,
      progress: 40,
      paymentStatus: "paid",
      totalRevenue: 1200
    }
  ];

  const mockStats = {
    totalClients: 127,
    activeClients: 89,
    monthlyRevenue: 24500,
    avgRating: 4.8
  };

  const mockUpcomingSessions = [
    {
      id: 1,
      clientName: "Sarah Johnson",
      scheduledAt: "2025-01-30T10:00:00Z"
    },
    {
      id: 2,
      clientName: "Michael Chen",
      scheduledAt: "2025-01-30T14:30:00Z"
    },
    {
      id: 3,
      clientName: "David Thompson",
      scheduledAt: "2025-01-31T09:00:00Z"
    }
  ];

  const mockPaymentAlerts = [
    {
      id: 1,
      clientName: "Emily Rodriguez",
      amount: 300,
      type: "overdue",
      description: "Payment overdue by 5 days"
    },
    {
      id: 2,
      clientName: "Michael Chen",
      amount: 200,
      type: "pending",
      description: "Invoice sent 3 days ago"
    },
    {
      id: 3,
      clientName: "Sarah Johnson",
      amount: 200,
      type: "paid",
      description: "Payment received today"
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setClients(mockClients);
      setFilteredClients(mockClients);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...clients];

    if (filters.status) {
      filtered = filtered.filter(client => client.status === filters.status);
    }
    if (filters.payment) {
      filtered = filtered.filter(client => client.paymentStatus === filters.payment);
    }
    // Add more filter logic as needed

    setFilteredClients(filtered);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredClients(clients);
      return;
    }

    let filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.coachingType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredClients(filtered);
  };

  const handleSelectClient = (clientId, isSelected) => {
    if (isSelected) {
      setSelectedClients(prev => [...prev, clientId]);
    } else {
      setSelectedClients(prev => prev.filter(id => id !== clientId));
    }
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedClients(filteredClients.map(client => client.id));
    } else {
      setSelectedClients([]);
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action} on clients:`, selectedClients);
    // Implement bulk actions here
  };

  const handleAddClient = (newClient) => {
    setClients(prev => [newClient, ...prev]);
    setFilteredClients(prev => [newClient, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />
        <main className="lg:ml-72 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading client data...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Client Management - Rafiki</title>
        <meta name="description" content="Manage your coaching clients efficiently with comprehensive filtering and bulk operations." />
      </Helmet>

      <Header />
      <Sidebar />
      
      <main className="lg:ml-72 pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Client Management</h1>
              <p className="text-muted-foreground">
                Organize and manage your coaching clients with powerful filtering and bulk operations.
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Export
              </Button>
              <Button variant="outline">
                <Icon name="Upload" size={16} className="mr-2" />
                Import
              </Button>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Icon name="Plus" size={16} className="mr-2" />
                Add New Client
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Main Content */}
            <div className="xl:col-span-8">
              <FilterToolbar
                onFilterChange={handleFilterChange}
                onSearch={handleSearch}
                selectedClients={selectedClients}
                onBulkAction={handleBulkAction}
              />
              
              <ClientTable
                clients={filteredClients}
                selectedClients={selectedClients}
                onSelectClient={handleSelectClient}
                onSelectAll={handleSelectAll}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-4">
              <ClientSidebar
                stats={mockStats}
                upcomingSessions={mockUpcomingSessions}
                paymentAlerts={mockPaymentAlerts}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Add Client Modal */}
      <AddClientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddClient={handleAddClient}
      />

      {/* AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
};

export default ClientManagement;