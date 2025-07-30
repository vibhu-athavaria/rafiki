import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistantWidget from '../../components/ui/AIAssistantWidget';
import MetricCard from './components/MetricCard';
import UpcomingSessionCard from './components/UpcomingSessionCard';
import AIInsightCard from './components/AIInsightCard';
import ActivityFeedItem from './components/ActivityFeedItem';
import QuickActionCard from './components/QuickActionCard';
import ProgressChart from './components/ProgressChart';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Mock data for metrics
  const metrics = [
    {
      title: 'Active Clients',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Upcoming Sessions',
      value: '8',
      change: '+3',
      changeType: 'positive',
      icon: 'Calendar',
      color: 'success'
    },
    {
      title: 'Pending Invoices',
      value: '5',
      change: '-2',
      changeType: 'negative',
      icon: 'FileText',
      color: 'warning'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '+18%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    }
  ];

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      clientId: 'client-1',
      clientName: 'Sarah Johnson',
      sessionType: 'Life Coaching',
      date: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      location: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      clientId: 'client-2',
      clientName: 'Michael Chen',
      sessionType: 'Business Strategy',
      date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
      location: 'Office',
      status: 'confirmed'
    },
    {
      id: 3,
      clientId: 'client-3',
      clientName: 'Emily Rodriguez',
      sessionType: 'Career Development',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      location: 'Video Call',
      status: 'pending'
    },
    {
      id: 4,
      clientId: 'client-4',
      clientName: 'David Thompson',
      sessionType: 'Executive Coaching',
      date: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString(), // Tomorrow
      location: 'Client Office',
      status: 'confirmed'
    }
  ];

  // Mock data for AI insights
  const aiInsights = [
    {
      id: 1,
      type: 'recommendation',
      title: 'Client Engagement Opportunity',
      description: `Sarah Johnson hasn't scheduled a follow-up session in 2 weeks. Consider reaching out to maintain momentum on her career transition goals.`,priority: 'medium',clientName: 'Sarah Johnson',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 minutes ago
    },
    {
      id: 2,
      type: 'progress',title: 'Goal Achievement Alert',description: `Michael Chen has completed 80% of his quarterly business objectives. Schedule a review session to celebrate progress and set new targets.`,priority: 'high',clientName: 'Michael Chen',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 hours ago
    },
    {
      id: 3,
      type: 'alert',title: 'Session Pattern Analysis',description: `Clients who schedule morning sessions show 23% higher goal completion rates. Consider promoting morning slots.`,priority: 'low',
      clientName: null,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
    }
  ];

  // Mock data for activity feed
  const activities = [
    {
      id: 1,
      type: 'session_completed',
      title: 'Session completed with Sarah Johnson',
      description: 'Life coaching session focused on career transition strategies',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
      amount: null
    },
    {
      id: 2,
      type: 'payment_received',
      title: 'Payment received',
      description: 'Invoice #INV-2024-0156 paid by Michael Chen',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      amount: '250.00'
    },
    {
      id: 3,
      type: 'client_added',
      title: 'New client added',
      description: 'Emily Rodriguez joined as a career development client',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      amount: null
    },
    {
      id: 4,
      type: 'session_scheduled',
      title: 'Session scheduled',
      description: 'Executive coaching session with David Thompson for tomorrow',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      amount: null
    },
    {
      id: 5,
      type: 'goal_achieved',
      title: 'Client goal achieved',
      description: 'Sarah Johnson completed her networking milestone',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
      amount: null
    }
  ];

  // Mock data for quick actions
  const quickActions = [
    {
      title: 'Schedule Session',
      description: 'Book a new coaching session with existing or new clients',
      icon: 'Calendar',
      action: 'Schedule Now',
      route: '/calendar-scheduling',
      color: 'primary'
    },
    {
      title: 'Add New Client',
      description: 'Onboard a new client and set up their coaching profile',
      icon: 'UserPlus',
      action: 'Add Client',
      route: '/client-management',
      color: 'success'
    },
    {
      title: 'Create Invoice',
      description: 'Generate and send invoices for completed sessions',
      icon: 'FileText',
      action: 'Create Invoice',
      route: '/dashboard', // Would be invoice route in real app
      color: 'warning'
    }
  ];

  // Mock data for progress charts
  const monthlyProgressData = [
    { name: 'Jan', value: 8500 },
    { name: 'Feb', value: 9200 },
    { name: 'Mar', value: 10100 },
    { name: 'Apr', value: 9800 },
    { name: 'May', value: 11200 },
    { name: 'Jun', value: 12450 }
  ];

  const clientEngagementData = [
    { name: 'Week 1', value: 18 },
    { name: 'Week 2', value: 22 },
    { name: 'Week 3', value: 20 },
    { name: 'Week 4', value: 24 }
  ];

  const formatCurrentTime = () => {
    return currentTime.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="lg:ml-72 pt-16">
        <div className="p-6 max-w-7xl mx-auto">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  {formatCurrentTime()}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                <Button variant="outline" iconName="Download" iconSize={16}>
                  Export Data
                </Button>
                <Link to="/ai-chat-assistant">
                  <Button variant="default" iconName="Bot" iconSize={16}>
                    AI Assistant
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                changeType={metric.changeType}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Upcoming Sessions */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Upcoming Sessions</h2>
                  <Link to="/calendar-scheduling">
                    <Button variant="outline" size="sm" iconName="Calendar" iconSize={16}>
                      View Calendar
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {upcomingSessions.map((session) => (
                    <UpcomingSessionCard key={session.id} session={session} />
                  ))}
                </div>
                {upcomingSessions.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No upcoming sessions scheduled</p>
                    <Link to="/calendar-scheduling">
                      <Button variant="outline" className="mt-4">
                        Schedule a Session
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* AI Insights */}
            <div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">AI Insights</h2>
                  <Link to="/ai-chat-assistant">
                    <Button variant="outline" size="sm" iconName="Bot" iconSize={16}>
                      View All
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {aiInsights.map((insight) => (
                    <AIInsightCard key={insight.id} insight={insight} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <QuickActionCard
                  key={index}
                  title={action.title}
                  description={action.description}
                  icon={action.icon}
                  action={action.action}
                  route={action.route}
                  color={action.color}
                />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ProgressChart
              data={monthlyProgressData}
              type="line"
              title="Monthly Revenue Trend"
              color="var(--color-success)"
            />
            <ProgressChart
              data={clientEngagementData}
              type="bar"
              title="Weekly Client Engagement"
              color="var(--color-primary)"
            />
          </div>

          {/* Activity Feed */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
              <Button variant="outline" size="sm" iconName="Activity" iconSize={16}>
                View All Activity
              </Button>
            </div>
            <div className="space-y-2">
              {activities.map((activity) => (
                <ActivityFeedItem key={activity.id} activity={activity} />
              ))}
            </div>
            {activities.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <AIAssistantWidget />
    </div>
  );
};

export default Dashboard;