import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionSelect }) => {
  const quickActions = [
    {
      id: 'analyze-session',
      title: 'Analyze Recent Session',
      description: 'Get insights from your latest client session',
      icon: 'BarChart3',
      prompt: 'Please analyze my most recent client session and provide key insights, breakthrough moments, and recommendations for follow-up strategies.',
      category: 'analysis'
    },
    {
      id: 'coaching-techniques',
      title: 'Suggest Coaching Techniques',
      description: 'Get personalized coaching method recommendations',
      icon: 'Lightbulb',
      prompt: 'Based on my coaching style and current client challenges, suggest specific coaching techniques and approaches that would be most effective.',
      category: 'techniques'
    },
    {
      id: 'client-progress',
      title: 'Review Client Progress',
      description: 'Track and analyze client development patterns',
      icon: 'TrendingUp',
      prompt: 'Review the progress patterns of my active clients and identify who might need additional support or different coaching approaches.',
      category: 'progress'
    },
    {
      id: 'session-prep',
      title: 'Prepare for Next Session',
      description: 'Get session planning and preparation guidance',
      icon: 'Calendar',
      prompt: 'Help me prepare for my upcoming client sessions. Provide session structure suggestions, key questions to ask, and goals to focus on.',
      category: 'preparation'
    },
    {
      id: 'goal-setting',
      title: 'Goal Setting Strategies',
      description: 'Learn effective goal-setting frameworks',
      icon: 'Target',
      prompt: 'Provide me with advanced goal-setting strategies and frameworks that I can use with my clients to improve their success rates.',
      category: 'strategies'
    },
    {
      id: 'difficult-conversations',
      title: 'Handle Difficult Conversations',
      description: 'Navigate challenging client interactions',
      icon: 'MessageSquare',
      prompt: 'Give me guidance on handling difficult conversations with clients, including techniques for addressing resistance and maintaining rapport.',
      category: 'communication'
    }
  ];

  const categories = {
    analysis: { label: 'Analysis', color: 'text-blue-600' },
    techniques: { label: 'Techniques', color: 'text-green-600' },
    progress: { label: 'Progress', color: 'text-purple-600' },
    preparation: { label: 'Preparation', color: 'text-orange-600' },
    strategies: { label: 'Strategies', color: 'text-red-600' },
    communication: { label: 'Communication', color: 'text-indigo-600' }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How can I help you today?
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose a quick action below or ask me anything about coaching
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            onClick={() => onActionSelect(action)}
            className="h-auto p-4 text-left justify-start hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-start space-x-3 w-full">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={action.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-sm text-foreground">
                    {action.title}
                  </h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-muted ${
                    categories[action.category]?.color || 'text-muted-foreground'
                  }`}>
                    {categories[action.category]?.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <Icon name="ArrowRight" size={16} className="text-muted-foreground flex-shrink-0" />
            </div>
          </Button>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Or try these example prompts:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              'How do I handle client resistance?',
              'Best practices for virtual coaching',
              'Measuring coaching ROI',
              'Building client trust quickly'
            ].map((prompt, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => onActionSelect({ prompt })}
                className="text-xs bg-muted/50 hover:bg-muted"
              >
                "{prompt}"
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;