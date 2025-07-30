import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const OverviewTab = ({ client }) => {
  const sessionData = [
    { month: 'Jan', sessions: 4, progress: 65 },
    { month: 'Feb', sessions: 6, progress: 72 },
    { month: 'Mar', sessions: 5, progress: 78 },
    { month: 'Apr', sessions: 7, progress: 85 },
    { month: 'May', sessions: 6, progress: 88 },
    { month: 'Jun', sessions: 8, progress: 92 }
  ];

  const recentNotes = [
    {
      id: 1,
      date: '2025-01-28',
      content: `Client showed significant improvement in confidence during today's session. We worked on public speaking techniques and practiced the elevator pitch. Next session will focus on networking strategies.`,type: 'session'
    },
    {
      id: 2,
      date: '2025-01-25',content: `Follow-up call completed. Client successfully implemented the time management strategies we discussed. Reported 30% increase in daily productivity.`,type: 'follow-up'
    },
    {
      id: 3,
      date: '2025-01-22',
      content: `Homework assignment: Complete the leadership assessment and prepare three examples of recent leadership challenges for next session discussion.`,
      type: 'homework'
    }
  ];

  const milestones = [
    { id: 1, title: 'Initial Assessment Completed', date: '2024-12-15', completed: true },
    { id: 2, title: 'First Quarter Goals Set', date: '2025-01-05', completed: true },
    { id: 3, title: 'Mid-Program Review', date: '2025-03-15', completed: false },
    { id: 4, title: 'Final Assessment', date: '2025-06-15', completed: false }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Client Details & Notes */}
      <div className="lg:col-span-1 space-y-6">
        {/* Client Details */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Client Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Coaching Program</label>
              <p className="text-sm text-foreground mt-1">{client.program}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Start Date</label>
              <p className="text-sm text-foreground mt-1">{client.startDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Session Frequency</label>
              <p className="text-sm text-foreground mt-1">{client.frequency}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Preferred Communication</label>
              <p className="text-sm text-foreground mt-1">{client.preferredCommunication}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Time Zone</label>
              <p className="text-sm text-foreground mt-1">{client.timezone}</p>
            </div>
          </div>
        </div>

        {/* Recent Notes */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Notes</h3>
            <Button variant="outline" size="sm" iconName="Plus">
              Add Note
            </Button>
          </div>
          <div className="space-y-4">
            {recentNotes.map((note) => (
              <div key={note.id} className="border-l-2 border-primary/20 pl-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    note.type === 'session' ? 'bg-primary/10 text-primary' :
                    note.type === 'follow-up'? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                  }`}>
                    {note.type.charAt(0).toUpperCase() + note.type.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">{note.date}</span>
                </div>
                <p className="text-sm text-foreground">{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Center Column - Session Timeline */}
      <div className="lg:col-span-1 space-y-6">
        {/* Session Activity Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Session Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="sessions" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Bot" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">AI Insights</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Progress Acceleration</h4>
                  <p className="text-sm text-muted-foreground">
                    Client shows 23% faster goal achievement compared to similar coaching programs. Consider introducing advanced challenges.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Attention Needed</h4>
                  <p className="text-sm text-muted-foreground">
                    Client mentioned stress levels increasing. Recommend focusing on stress management techniques in next session.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Strength Identified</h4>
                  <p className="text-sm text-muted-foreground">
                    Excellent communication skills development. Client ready for leadership-focused coaching modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Progress & Goals */}
      <div className="lg:col-span-1 space-y-6">
        {/* Progress Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Progress Tracking</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sessionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-success">92%</p>
            <p className="text-sm text-muted-foreground">Overall Progress</p>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Program Milestones</h3>
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  milestone.completed 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={milestone.completed ? "Check" : "Clock"} size={12} />
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">24</p>
            <p className="text-sm text-muted-foreground">Total Sessions</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">18</p>
            <p className="text-sm text-muted-foreground">Goals Achieved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;