import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProgressTab = ({ client }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6months');

  const progressData = {
    '3months': [
      { month: 'Nov', confidence: 45, leadership: 40, communication: 50, timeManagement: 35 },
      { month: 'Dec', confidence: 55, leadership: 48, communication: 58, timeManagement: 42 },
      { month: 'Jan', confidence: 72, leadership: 65, communication: 75, timeManagement: 68 }
    ],
    '6months': [
      { month: 'Aug', confidence: 30, leadership: 25, communication: 35, timeManagement: 20 },
      { month: 'Sep', confidence: 35, leadership: 30, communication: 40, timeManagement: 25 },
      { month: 'Oct', confidence: 40, leadership: 35, communication: 45, timeManagement: 30 },
      { month: 'Nov', confidence: 45, leadership: 40, communication: 50, timeManagement: 35 },
      { month: 'Dec', confidence: 55, leadership: 48, communication: 58, timeManagement: 42 },
      { month: 'Jan', confidence: 72, leadership: 65, communication: 75, timeManagement: 68 }
    ],
    '12months': [
      { month: 'Feb 24', confidence: 20, leadership: 15, communication: 25, timeManagement: 10 },
      { month: 'Mar', confidence: 22, leadership: 18, communication: 28, timeManagement: 12 },
      { month: 'Apr', confidence: 25, leadership: 20, communication: 30, timeManagement: 15 },
      { month: 'May', confidence: 28, leadership: 23, communication: 32, timeManagement: 18 },
      { month: 'Jun', confidence: 30, leadership: 25, communication: 35, timeManagement: 20 },
      { month: 'Jul', confidence: 32, leadership: 28, communication: 38, timeManagement: 22 },
      { month: 'Aug', confidence: 35, leadership: 30, communication: 40, timeManagement: 25 },
      { month: 'Sep', confidence: 40, leadership: 35, communication: 45, timeManagement: 30 },
      { month: 'Oct', confidence: 45, leadership: 40, communication: 50, timeManagement: 35 },
      { month: 'Nov', confidence: 55, leadership: 48, communication: 58, timeManagement: 42 },
      { month: 'Dec', confidence: 65, leadership: 60, communication: 68, timeManagement: 58 },
      { month: 'Jan 25', confidence: 72, leadership: 65, communication: 75, timeManagement: 68 }
    ]
  };

  const skillsData = [
    { skill: 'Confidence', value: 72, color: '#2563EB' },
    { skill: 'Leadership', value: 65, color: '#10B981' },
    { skill: 'Communication', value: 75, color: '#F59E0B' },
    { skill: 'Time Management', value: 68, color: '#EF4444' }
  ];

  const goalsData = [
    { name: 'Completed', value: 18, color: '#10B981' },
    { name: 'In Progress', value: 8, color: '#F59E0B' },
    { name: 'Not Started', value: 4, color: '#E5E7EB' }
  ];

  const goals = [
    {
      id: 1,
      title: 'Improve Public Speaking Confidence',
      description: 'Deliver presentations without anxiety and engage audience effectively',
      status: 'completed',
      progress: 100,
      startDate: '2024-12-01',
      targetDate: '2025-01-15',
      completedDate: '2025-01-12',
      milestones: [
        { title: 'Complete Toastmasters evaluation', completed: true },
        { title: 'Present to team (10+ people)', completed: true },
        { title: 'Lead quarterly review meeting', completed: true },
        { title: 'Deliver client presentation', completed: true }
      ]
    },
    {
      id: 2,
      title: 'Develop Team Leadership Skills',
      description: 'Build effective team management and delegation capabilities',
      status: 'in-progress',
      progress: 75,
      startDate: '2024-11-15',
      targetDate: '2025-02-28',
      milestones: [
        { title: 'Complete leadership assessment', completed: true },
        { title: 'Implement weekly one-on-ones', completed: true },
        { title: 'Create team development plan', completed: true },
        { title: 'Conduct performance reviews', completed: false },
        { title: 'Lead cross-functional project', completed: false }
      ]
    },
    {
      id: 3,
      title: 'Master Time Management Systems',
      description: 'Implement productivity frameworks and maintain work-life balance',
      status: 'in-progress',
      progress: 60,
      startDate: '2025-01-01',
      targetDate: '2025-03-31',
      milestones: [
        { title: 'Set up time-blocking system', completed: true },
        { title: 'Implement GTD methodology', completed: true },
        { title: 'Establish daily routines', completed: false },
        { title: 'Optimize meeting schedules', completed: false },
        { title: 'Create delegation framework', completed: false }
      ]
    },
    {
      id: 4,
      title: 'Build Strategic Thinking Capabilities',
      description: 'Develop long-term planning and strategic decision-making skills',
      status: 'not-started',
      progress: 0,
      startDate: '2025-03-01',
      targetDate: '2025-06-30',
      milestones: [
        { title: 'Complete strategic thinking course', completed: false },
        { title: 'Develop 5-year career plan', completed: false },
        { title: 'Create department strategy', completed: false },
        { title: 'Present strategic initiative', completed: false }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'in-progress':
        return 'bg-warning text-warning-foreground';
      case 'not-started':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-warning';
    if (progress >= 40) return 'bg-primary';
    return 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Progress Chart */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Skills Development</h3>
            <div className="flex space-x-2">
              {['3months', '6months', '12months'].map((timeframe) => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                >
                  {timeframe === '3months' ? '3M' : timeframe === '6months' ? '6M' : '12M'}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData[selectedTimeframe]}>
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
                <Line type="monotone" dataKey="confidence" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="leadership" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="communication" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="timeManagement" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {skillsData.map((skill) => (
              <div key={skill.skill} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: skill.color }}
                  ></div>
                  <span className="text-sm font-medium text-foreground">{skill.value}%</span>
                </div>
                <p className="text-xs text-muted-foreground">{skill.skill}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Goals Overview */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-6">Goals Overview</h3>
          
          <div className="h-48 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={goalsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {goalsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {goalsData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <p className="text-2xl font-bold text-success">60%</p>
              <p className="text-sm text-muted-foreground">Goals Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Goals Detail */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Goal Progress</h3>
          <Button variant="default" iconName="Plus" size="sm">
            Add Goal
          </Button>
        </div>

        <div className="space-y-6">
          {goals.map((goal) => (
            <div key={goal.id} className="border border-border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-foreground">{goal.title}</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                      {goal.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(goal.progress)}`}
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <label className="text-muted-foreground">Start Date</label>
                      <p className="text-foreground">{goal.startDate}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Target Date</label>
                      <p className="text-foreground">{goal.targetDate}</p>
                    </div>
                    {goal.completedDate && (
                      <div>
                        <label className="text-muted-foreground">Completed</label>
                        <p className="text-foreground">{goal.completedDate}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" iconName="MoreHorizontal">
                  </Button>
                </div>
              </div>

              {/* Milestones */}
              <div>
                <h5 className="font-medium text-foreground mb-3">Milestones</h5>
                <div className="space-y-2">
                  {goal.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        milestone.completed 
                          ? 'bg-success text-success-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon name={milestone.completed ? "Check" : "Clock"} size={12} />
                      </div>
                      <span className={`text-sm ${
                        milestone.completed ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTab;