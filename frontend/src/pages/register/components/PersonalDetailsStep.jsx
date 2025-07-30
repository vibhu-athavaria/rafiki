import React from 'react';
import Input from '../../../components/ui/Input';

const PersonalDetailsStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Personal Information</h3>
        <p className="text-muted-foreground">
          Let's start with your basic information to personalize your coaching experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          value={formData.firstName || ''}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
          required
        />
        
        <Input
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          value={formData.lastName || ''}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your professional email"
        description="This will be your login email and where we'll send important updates"
        value={formData.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 123-4567"
        description="For account security and client communication features"
        value={formData.phone || ''}
        onChange={(e) => handleChange('phone', e.target.value)}
        error={errors.phone}
        required
      />

      <Input
        label="Professional Title"
        type="text"
        placeholder="e.g., Life Coach, Business Coach, Executive Coach"
        description="How you'd like to be addressed by clients"
        value={formData.title || ''}
        onChange={(e) => handleChange('title', e.target.value)}
        error={errors.title}
        required
      />
    </div>
  );
};

export default PersonalDetailsStep;