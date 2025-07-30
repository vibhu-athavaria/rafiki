import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AddClientModal = ({ isOpen, onClose, onAddClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coachingType: '',
    status: 'active',
    goals: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const coachingTypeOptions = [
    { value: 'life', label: 'Life Coaching' },
    { value: 'business', label: 'Business Coaching' },
    { value: 'career', label: 'Career Coaching' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'relationship', label: 'Relationship Coaching' },
    { value: 'executive', label: 'Executive Coaching' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'paused', label: 'Paused' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newClient = {
        id: Date.now(),
        ...formData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        lastSession: new Date().toISOString(),
        sessionCount: 0,
        progress: 0,
        paymentStatus: 'pending',
        totalRevenue: 0,
        createdAt: new Date().toISOString()
      };

      onAddClient(newClient);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        coachingType: '',
        status: 'active',
        goals: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1400] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="UserPlus" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Add New Client</h2>
              <p className="text-sm text-muted-foreground">Create a new client profile to start coaching</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                placeholder="Enter client's full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                placeholder="client@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
              
              <Select
                label="Coaching Type"
                placeholder="Select coaching type"
                options={coachingTypeOptions}
                value={formData.coachingType}
                onChange={(value) => handleInputChange('coachingType', value)}
                required
              />
            </div>

            <Select
              label="Initial Status"
              placeholder="Select client status"
              options={statusOptions}
              value={formData.status}
              onChange={(value) => handleInputChange('status', value)}
              required
            />
          </div>

          {/* Coaching Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Coaching Details</h3>
            
            <Input
              label="Primary Goals"
              type="text"
              placeholder="What are the client's main objectives?"
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              description="Brief description of what the client wants to achieve"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Initial Notes
              </label>
              <textarea
                placeholder="Add any initial observations, preferences, or important information about the client..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              iconName="UserPlus"
              iconPosition="left"
            >
              {isSubmitting ? 'Adding Client...' : 'Add Client'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddClientModal;