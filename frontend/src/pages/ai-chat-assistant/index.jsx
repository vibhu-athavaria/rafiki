import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AIAssistantWidget from '../../components/ui/AIAssistantWidget';
import ConversationSidebar from './components/ConversationSidebar';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import Button from '../../components/ui/Button';


const AIChat = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    tone: 'professional',
    specialty: 'life-coaching',
    responseStyle: 'detailed',
    contextMemory: true,
    sessionAnalysis: true,
    proactiveInsights: false,
    dataRetention: 30,
    exportFormat: 'markdown'
  });

  // Mock conversations data
  useEffect(() => {
    const mockConversations = [
      {
        id: 1,
        title: 'Session Analysis - Sarah Johnson',
        preview: 'Analyzed breakthrough moment in career transition discussion...',
        lastMessage: new Date(Date.now() - 3600000), // 1 hour ago
        unreadCount: 0,
        messages: [
          {
            type: 'assistant',
            content: `Hello! I'm your AI coaching assistant. I can help you with session analysis, coaching strategies, client insights, and much more.\n\nHow can I assist you with your coaching practice today?`,
            timestamp: new Date(Date.now() - 3600000)
          }
        ]
      },
      {
        id: 2,
        title: 'Coaching Techniques Discussion',preview: 'Explored advanced questioning techniques for executive clients...',
        lastMessage: new Date(Date.now() - 7200000), // 2 hours ago
        unreadCount: 2,
        messages: [
          {
            type: 'user',content: 'I need help with coaching techniques for executive clients who are resistant to change.',
            timestamp: new Date(Date.now() - 7200000)
          },
          {
            type: 'assistant',
            content: `Working with resistant executive clients requires a nuanced approach. Here are some proven techniques:\n\n**1. The Socratic Method**\n- Ask powerful questions that lead them to their own conclusions\n- "What would happen if nothing changed?"\n- "What's the cost of maintaining the status quo?"\n\n**2. Reframe Resistance as Information**\n- View resistance as valuable data about their concerns\n- Explore what they're protecting or afraid of losing\n\n**3. Use Their Language and Metrics**\n- Speak in terms of ROI, efficiency, and business outcomes\n- Connect personal change to professional success\n\nWould you like me to elaborate on any of these approaches?`,
            timestamp: new Date(Date.now() - 7000000)
          }
        ]
      },
      {
        id: 3,
        title: 'Client Progress Review',preview: 'Reviewed quarterly progress for 5 active clients...',
        lastMessage: new Date(Date.now() - 86400000), // 1 day ago
        unreadCount: 0,
        messages: [
          {
            type: 'user',content: 'Can you help me review the progress of my active clients and identify who might need additional support?',
            timestamp: new Date(Date.now() - 86400000)
          },
          {
            type: 'assistant',content: `Based on your client data, here's a progress analysis:\n\n**High Performers (3 clients):**\n- Consistently meeting session goals\n- Proactive in completing action items\n- Showing measurable progress\n\n**Moderate Progress (2 clients):**\n- Meeting some goals but inconsistent\n- May benefit from adjusted approach\n- Consider more frequent check-ins\n\n**Needs Additional Support (1 client):**\n- Missing sessions or arriving unprepared\n- Not completing agreed-upon actions\n- May need motivation reassessment\n\nWould you like specific recommendations for any of these groups?`,
            timestamp: new Date(Date.now() - 86000000)
          }
        ]
      }
    ];

    setConversations(mockConversations);
    setActiveConversation(mockConversations[0]);
  }, []);

  const handleNewConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: 'New Conversation',
      preview: 'Start a new conversation...',
      lastMessage: new Date(),
      unreadCount: 0,
      messages: [
        {
          type: 'assistant',
          content: `Hello! I'm ready to help you with your coaching practice. What would you like to discuss today?\n\nI can assist with:\n• Session analysis and insights\n• Coaching technique recommendations\n• Client progress reviews\n• Goal setting strategies\n• Difficult conversation guidance\n\nWhat's on your mind?`,
          timestamp: new Date()
        }
      ]
    };

    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
  };

  const handleConversationSelect = (conversation) => {
    setActiveConversation(conversation);

    // Mark as read
    if (conversation.unreadCount > 0) {
      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversation.id
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  };

  const handleSendMessage = async (messageData) => {
    if (!activeConversation) return;

    const userMessage = {
      type: 'user',
      content: messageData.content,
      attachments: messageData.attachments,
      timestamp: messageData.timestamp,
      status: 'sent'
    };

    // Update conversation with user message
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, userMessage],
      lastMessage: new Date(),
      preview: messageData.content.substring(0, 50) + '...'
    };

    setActiveConversation(updatedConversation);
    setConversations(prev =>
      prev.map(conv =>
        conv.id === activeConversation.id ? updatedConversation : conv
      )
    );

    // Simulate AI typing
    setIsTyping(true);

    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponses = [
        `That's an excellent question! Based on your coaching experience and the context you've provided, here are some insights:\n\n**Key Considerations:**\n• Understanding the underlying motivations\n• Identifying potential resistance points\n• Leveraging their existing strengths\n\n**Recommended Approach:**\n1. Start with open-ended questions to explore their perspective\n2. Use reflective listening to validate their concerns\n3. Collaborate on setting realistic, achievable goals\n\nWould you like me to dive deeper into any of these areas?`,

        `I understand what you're looking for. Let me provide some evidence-based strategies that align with your coaching style:\n\n**Immediate Actions:**\n• Schedule a dedicated planning session\n• Review their current progress metrics\n• Identify any external factors affecting performance\n\n**Long-term Strategy:**\n• Implement regular check-in protocols\n• Develop accountability partnerships\n• Create milestone celebration moments\n\nHow does this approach resonate with your current coaching methodology?`,

        `Great insight! This is a common challenge that many coaches face. Here's how I'd recommend approaching it:\n\n**Assessment Phase:**\n• Evaluate their current readiness for change\n• Identify their core values and motivators\n• Understand their support system\n\n**Implementation Phase:**\n• Break down goals into manageable steps\n• Create clear success metrics\n• Establish regular feedback loops\n\nWhat specific aspect would you like to explore further?`
      ];

      const aiMessage = {
        type: 'assistant',
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date()
      };

      const finalConversation = {
        ...updatedConversation,
        messages: [...updatedConversation.messages, aiMessage],
        lastMessage: new Date()
      };

      setActiveConversation(finalConversation);
      setConversations(prev =>
        prev.map(conv =>
          conv.id === activeConversation.id ? finalConversation : conv
        )
      );
      setIsTyping(false);
    }, 2000);
  };

  const handleExportConversation = () => {
    if (!activeConversation) return;

    const exportData = {
      title: activeConversation.title,
      date: new Date().toISOString(),
      messages: activeConversation.messages.map(msg => ({
        type: msg.type,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${activeConversation.id}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    // In a real app, you'd save these to a backend or localStorage localStorage.setItem('ai-assistant-settings', JSON.stringify(newSettings));
  };

  return (
    <>
      <Helmet>
        <title>AI Chat Assistant - Rafiki</title>
        <meta name="description" content="Get intelligent coaching insights and personalized guidance with our AI-powered chat assistant" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar />

        <main className="lg:ml-72 pt-16">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Breadcrumb />
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg shadow-sm h-[calc(100vh-200px)] flex overflow-hidden">
              {/* Conversation Sidebar */}
              <ConversationSidebar
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationSelect={handleConversationSelect}
                onNewConversation={handleNewConversation}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              />

              {/* Chat Interface */}
              <ChatInterface
                activeConversation={activeConversation}
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
                onExportConversation={handleExportConversation}
              />
            </div>
          </div>
        </main>

        {/* Settings Panel */}
        <SettingsPanel
          isOpen={showSettings}
          onClose={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={handleSettingsChange}
        />

        {/* AI Assistant Widget (for other pages) */}
        <AIAssistantWidget />
      </div>
    </>
  );
};

export default AIChat;