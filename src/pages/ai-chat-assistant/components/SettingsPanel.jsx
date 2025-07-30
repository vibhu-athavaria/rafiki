import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsPanel = ({ isOpen, onClose, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-focused' },
    { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
    { value: 'directive', label: 'Directive', description: 'Clear and action-oriented' },
    { value: 'supportive', label: 'Supportive', description: 'Encouraging and empathetic' }
  ];

  const specialtyOptions = [
    { value: 'life-coaching', label: 'Life Coaching' },
    { value: 'business-coaching', label: 'Business Coaching' },
    { value: 'executive-coaching', label: 'Executive Coaching' },
    { value: 'career-coaching', label: 'Career Coaching' },
    { value: 'wellness-coaching', label: 'Wellness Coaching' },
    { value: 'performance-coaching', label: 'Performance Coaching' }
  ];

  const responseStyleOptions = [
    { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' },
    { value: 'concise', label: 'Concise', description: 'Brief and to the point' },
    { value: 'structured', label: 'Structured', description: 'Organized with bullet points' },
    { value: 'conversational', label: 'Conversational', description: 'Natural dialogue style' }
  ];

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings = {
      tone: 'professional',
      specialty: 'life-coaching',
      responseStyle: 'detailed',
      contextMemory: true,
      sessionAnalysis: true,
      proactiveInsights: false,
      dataRetention: 30,
      exportFormat: 'markdown'
    };
    setLocalSettings(defaultSettings);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1400] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">AI Assistant Settings</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Customize your AI coaching assistant experience
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Communication Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Communication Style</h3>
            
            <Select
              label="AI Tone"
              description="How the AI should communicate with you"
              options={toneOptions}
              value={localSettings.tone}
              onChange={(value) => setLocalSettings(prev => ({ ...prev, tone: value }))}
            />

            <Select
              label="Response Style"
              description="Format and length of AI responses"
              options={responseStyleOptions}
              value={localSettings.responseStyle}
              onChange={(value) => setLocalSettings(prev => ({ ...prev, responseStyle: value }))}
            />
          </div>

          {/* Coaching Specialty */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Coaching Focus</h3>
            
            <Select
              label="Primary Specialty"
              description="Your main coaching area for tailored insights"
              options={specialtyOptions}
              value={localSettings.specialty}
              onChange={(value) => setLocalSettings(prev => ({ ...prev, specialty: value }))}
            />
          </div>

          {/* AI Capabilities */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">AI Capabilities</h3>
            
            <div className="space-y-3">
              <Checkbox
                label="Context Memory"
                description="Remember previous conversations and client details"
                checked={localSettings.contextMemory}
                onChange={(e) => setLocalSettings(prev => ({ 
                  ...prev, 
                  contextMemory: e.target.checked 
                }))}
              />

              <Checkbox
                label="Session Analysis"
                description="Automatically analyze uploaded session recordings"
                checked={localSettings.sessionAnalysis}
                onChange={(e) => setLocalSettings(prev => ({ 
                  ...prev, 
                  sessionAnalysis: e.target.checked 
                }))}
              />

              <Checkbox
                label="Proactive Insights"
                description="Receive unsolicited coaching recommendations"
                checked={localSettings.proactiveInsights}
                onChange={(e) => setLocalSettings(prev => ({ 
                  ...prev, 
                  proactiveInsights: e.target.checked 
                }))}
              />
            </div>
          </div>

          {/* Data & Privacy */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Data & Privacy</h3>
            
            <Input
              label="Data Retention (days)"
              type="number"
              description="How long to keep conversation history"
              value={localSettings.dataRetention}
              onChange={(e) => setLocalSettings(prev => ({ 
                ...prev, 
                dataRetention: parseInt(e.target.value) || 30 
              }))}
              min="1"
              max="365"
            />

            <Select
              label="Export Format"
              description="Default format for conversation exports"
              options={[
                { value: 'markdown', label: 'Markdown (.md)' },
                { value: 'pdf', label: 'PDF Document' },
                { value: 'txt', label: 'Plain Text (.txt)' },
                { value: 'json', label: 'JSON Data' }
              ]}
              value={localSettings.exportFormat}
              onChange={(value) => setLocalSettings(prev => ({ ...prev, exportFormat: value }))}
            />
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Advanced</h3>
            
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Model Information</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Currently using GPT-4 Turbo with coaching-specific training data. 
                    Last updated: January 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <Button variant="ghost" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;