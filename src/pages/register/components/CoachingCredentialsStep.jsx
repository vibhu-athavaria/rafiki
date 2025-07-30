import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CoachingCredentialsStep = ({ formData, updateFormData, errors }) => {
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleSpecializationChange = (specialization, checked) => {
    const currentSpecializations = formData.specializations || [];
    if (checked) {
      updateFormData({ 
        specializations: [...currentSpecializations, specialization] 
      });
    } else {
      updateFormData({ 
        specializations: currentSpecializations.filter(s => s !== specialization) 
      });
    }
  };

  const certificationOptions = [
    { value: 'icf-acc', label: 'ICF Associate Certified Coach (ACC)' },
    { value: 'icf-pcc', label: 'ICF Professional Certified Coach (PCC)' },
    { value: 'icf-mcc', label: 'ICF Master Certified Coach (MCC)' },
    { value: 'cti', label: 'Co-Active Training Institute (CTI)' },
    { value: 'ipec', label: 'Institute for Professional Excellence in Coaching (iPEC)' },
    { value: 'other', label: 'Other Professional Certification' },
    { value: 'none', label: 'No formal certification (yet)' }
  ];

  const specializationOptions = [
    'Life Coaching',
    'Business Coaching',
    'Executive Coaching',
    'Career Coaching',
    'Health & Wellness Coaching',
    'Relationship Coaching',
    'Leadership Development',
    'Performance Coaching',
    'Mindfulness Coaching',
    'Financial Coaching'
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Coaching Credentials</h3>
        <p className="text-muted-foreground">
          Help us understand your coaching background to customize AI recommendations.
        </p>
      </div>

      <Select
        label="Primary Certification"
        description="Your main coaching certification (helps AI understand your methodology)"
        options={certificationOptions}
        value={formData.certification || ''}
        onChange={(value) => handleChange('certification', value)}
        error={errors.certification}
        placeholder="Select your certification"
        required
      />

      {formData.certification === 'other' && (
        <Input
          label="Other Certification Details"
          type="text"
          placeholder="Please specify your certification"
          value={formData.otherCertification || ''}
          onChange={(e) => handleChange('otherCertification', e.target.value)}
          error={errors.otherCertification}
          required
        />
      )}

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Coaching Specializations
          <span className="text-destructive ml-1">*</span>
        </label>
        <p className="text-sm text-muted-foreground mb-4">
          Select all areas you specialize in (helps AI provide relevant insights)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {specializationOptions.map((specialization) => (
            <Checkbox
              key={specialization}
              label={specialization}
              checked={(formData.specializations || []).includes(specialization)}
              onChange={(e) => handleSpecializationChange(specialization, e.target.checked)}
            />
          ))}
        </div>
        {errors.specializations && (
          <p className="text-sm text-destructive mt-2">{errors.specializations}</p>
        )}
      </div>

      <Input
        label="Coaching Philosophy"
        type="text"
        placeholder="Brief description of your coaching approach"
        description="Optional: Helps AI align with your coaching style"
        value={formData.philosophy || ''}
        onChange={(e) => handleChange('philosophy', e.target.value)}
        error={errors.philosophy}
      />
    </div>
  );
};

export default CoachingCredentialsStep;