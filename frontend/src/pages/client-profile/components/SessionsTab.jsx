import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const SessionsTab = ({ client }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  const sessions = [
    {
      id: 1,
      date: '2025-01-28',
      time: '2:00 PM - 3:00 PM',
      type: 'Video Call',
      status: 'completed',
      duration: '60 min',
      recording: 'session_recording_001.mp4',
      aiSummary: `Productive session focusing on leadership development. Client demonstrated improved confidence when discussing team management scenarios. Key breakthrough: recognized personal communication style impact on team dynamics.\n\nAction items discussed:\n- Implement weekly one-on-ones with team members\n- Practice active listening techniques\n- Read "Crucial Conversations" chapter 3-4\n\nNext session focus: Conflict resolution strategies and difficult conversation frameworks.`,
      notes: `Client arrived energetic and prepared with questions from last week's homework. Showed excellent progress in self-awareness exercises.\n\nDiscussed challenges with remote team management and explored various leadership styles. Client particularly resonated with servant leadership approach.\n\nHomework assigned: Practice daily reflection journaling and implement feedback framework with team.`,
      attachments: [
        { name: 'Leadership Assessment.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'Session Notes.docx', size: '1.1 MB', type: 'doc' }
      ]
    },
    {
      id: 2,
      date: '2025-01-21',time: '2:00 PM - 3:00 PM',type: 'Video Call',status: 'completed',duration: '60 min',recording: 'session_recording_002.mp4',
      aiSummary: `Session focused on goal setting and priority management. Client worked through the SMART goals framework and identified three key professional objectives for Q1.\n\nBreakthrough moment: Client realized the importance of saying 'no' to non-essential commitments to focus on high-impact activities.\n\nAction items:\n- Create weekly priority matrix\n- Set up time-blocking system\n- Establish boundaries with colleagues\n\nRecommendation: Continue building on time management foundation before introducing advanced productivity techniques.`,
      notes: `Great energy from client today. Came prepared with specific examples of time management challenges from the workplace.\n\nWorked through several scenarios using the Eisenhower Matrix. Client had several "aha" moments about task prioritization.\n\nAssigned reading: "Deep Work" by Cal Newport, chapters 1-2.`,
      attachments: [
        { name: 'SMART Goals Template.xlsx', size: '856 KB', type: 'excel' }
      ]
    },
    {
      id: 3,
      date: '2025-01-14',time: '2:00 PM - 3:00 PM',type: 'Phone Call',status: 'completed',duration: '45 min',recording: 'session_recording_003.mp3',aiSummary: `Initial assessment session. Comprehensive discussion of client's background, current challenges, and coaching objectives.\n\nKey insights:\n- Strong technical skills but needs leadership development\n- Struggles with work-life balance\n- Ambitious career goals with realistic timeline\n\nCoaching plan established: 6-month program focusing on leadership skills, time management, and career advancement strategies.\n\nClient shows high motivation and commitment to the coaching process.`,
      notes: `Excellent first session. Client is highly motivated and has clear vision of desired outcomes.\n\nCompleted comprehensive intake assessment. Identified key areas for development and established coaching agreement.\n\nClient background: 5 years in tech industry, recently promoted to team lead role, looking to advance to senior management within 2 years.`,
      attachments: [
        { name: 'Intake Assessment.pdf', size: '3.2 MB', type: 'pdf' },
        { name: 'Coaching Agreement.pdf', size: '1.8 MB', type: 'pdf' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground';
      case 'scheduled':
        return 'bg-primary text-primary-foreground';
      case 'cancelled':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video Call':
        return 'Video';
      case 'Phone Call':
        return 'Phone';
      case 'In Person':
        return 'Users';
      default:
        return 'MessageSquare';
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return 'FileText';
      case 'doc':
        return 'FileText';
      case 'excel':
        return 'FileSpreadsheet';
      case 'video':
        return 'Video';
      case 'audio':
        return 'Music';
      default:
        return 'File';
    }
  };

  return (
    <div className="space-y-6">
      {/* Session List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Session History</h3>
            <Button variant="default" iconName="Plus" size="sm">
              New Session
            </Button>
          </div>
          
          <div className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedSession?.id === session.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getTypeIcon(session.type)} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{session.date}</h4>
                      <p className="text-sm text-muted-foreground">{session.time}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{session.type} • {session.duration}</span>
                  <div className="flex items-center space-x-2">
                    {session.recording && (
                      <Icon name="Video" size={14} className="text-primary" />
                    )}
                    {session.attachments.length > 0 && (
                      <Icon name="Paperclip" size={14} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Details */}
        <div className="space-y-4">
          {selectedSession ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Session Details</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Edit">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export
                  </Button>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 space-y-6">
                {/* Session Info */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Session Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="text-muted-foreground">Date & Time</label>
                      <p className="text-foreground">{selectedSession.date} at {selectedSession.time}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Duration</label>
                      <p className="text-foreground">{selectedSession.duration}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Type</label>
                      <p className="text-foreground">{selectedSession.type}</p>
                    </div>
                    <div>
                      <label className="text-muted-foreground">Status</label>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status)}`}>
                        {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recording */}
                {selectedSession.recording && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Session Recording</h4>
                    <div className="bg-muted rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name="Play" size={20} className="text-primary" />
                        <div>
                          <p className="font-medium text-foreground">{selectedSession.recording}</p>
                          <p className="text-sm text-muted-foreground">Click to play recording</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  </div>
                )}

                {/* AI Summary */}
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name="Bot" size={16} className="text-primary" />
                    <h4 className="font-medium text-foreground">AI-Generated Summary</h4>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="text-sm text-foreground whitespace-pre-line">{selectedSession.aiSummary}</p>
                  </div>
                </div>

                {/* Manual Notes */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Coach Notes</h4>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-foreground whitespace-pre-line">{selectedSession.notes}</p>
                  </div>
                </div>

                {/* Attachments */}
                {selectedSession.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {selectedSession.attachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Icon name={getFileIcon(attachment.type)} size={16} className="text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{attachment.name}</p>
                              <p className="text-xs text-muted-foreground">{attachment.size}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" iconName="Download">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="MousePointer" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select a Session</h3>
              <p className="text-muted-foreground">Choose a session from the list to view detailed information, recordings, and notes.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionsTab;