import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PracticeInformationStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const experienceOptions = [
    { value: 'new', label: 'New to coaching (0-1 years)' },
    { value: 'beginner', label: 'Beginner (1-3 years)' },
    { value: 'intermediate', label: 'Intermediate (3-5 years)' },
    { value: 'experienced', label: 'Experienced (5-10 years)' },
    { value: 'expert', label: 'Expert (10+ years)' }
  ];

  const clientVolumeOptions = [
    { value: '1-5', label: '1-5 clients' },
    { value: '6-15', label: '6-15 clients' },
    { value: '16-30', label: '16-30 clients' },
    { value: '31-50', label: '31-50 clients' },
    { value: '50+', label: '50+ clients' }
  ];

  const practiceTypeOptions = [
    { value: 'solo', label: 'Solo Practice' },
    { value: 'group', label: 'Group/Team Practice' },
    { value: 'corporate', label: 'Corporate/In-house' },
    { value: 'freelance', label: 'Freelance/Contract' },
    { value: 'other', label: 'Other' }
  ];

  const sessionFormatOptions = [
    { value: 'in-person', label: 'Primarily In-Person' },
    { value: 'virtual', label: 'Primarily Virtual' },
    { value: 'hybrid', label: 'Hybrid (Both)' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Practice Information</h3>
        <p className="text-muted-foreground">
          Tell us about your coaching practice to optimize your Rafiki experience.
        </p>
      </div>

      <Select
        label="Years of Coaching Experience"
        description="Helps AI calibrate recommendations to your experience level"
        options={experienceOptions}
        value={formData.experience || ''}
        onChange={(value) => handleChange('experience', value)}
        error={errors.experience}
        placeholder="Select your experience level"
        required
      />

      <Select
        label="Current Client Volume"
        description="Approximate number of active clients you're currently coaching"
        options={clientVolumeOptions}
        value={formData.clientVolume || ''}
        onChange={(value) => handleChange('clientVolume', value)}
        error={errors.clientVolume}
        placeholder="Select client volume"
        required
      />

      <Select
        label="Practice Type"
        description="How do you primarily structure your coaching practice?"
        options={practiceTypeOptions}
        value={formData.practiceType || ''}
        onChange={(value) => handleChange('practiceType', value)}
        error={errors.practiceType}
        placeholder="Select practice type"
        required
      />

      <Select
        label="Session Format Preference"
        description="What format do you primarily use for coaching sessions?"
        options={sessionFormatOptions}
        value={formData.sessionFormat || ''}
        onChange={(value) => handleChange('sessionFormat', value)}
        error={errors.sessionFormat}
        placeholder="Select session format"
        required
      />

      <Input
        label="Average Session Duration (minutes)"
        type="number"
        placeholder="e.g., 60"
        description="Typical length of your coaching sessions"
        value={formData.sessionDuration || ''}
        onChange={(e) => handleChange('sessionDuration', e.target.value)}
        error={errors.sessionDuration}
        min="15"
        max="180"
        required
      />

      <Input
        label="Primary Goals for Using Rafiki"
        type="text"
        placeholder="e.g., Better session documentation, AI insights, client progress tracking"
        description="Optional: What do you hope to achieve with our platform?"
        value={formData.goals || ''}
        onChange={(e) => handleChange('goals', e.target.value)}
        error={errors.goals}
      />
    </div>
  );
};

export default PracticeInformationStep;