import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AccountSecurityStep = ({ formData, updateFormData, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return { strength: score, label: 'Weak', color: 'text-destructive' };
    if (score < 4) return { strength: score, label: 'Fair', color: 'text-warning' };
    if (score < 5) return { strength: score, label: 'Good', color: 'text-primary' };
    return { strength: score, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(formData.password || '');

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">Account Security</h3>
        <p className="text-muted-foreground">
          Create a secure password to protect your coaching data and client information.
        </p>
      </div>

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a strong password"
          description="Must be at least 8 characters with mixed case, numbers, and symbols"
          value={formData.password || ''}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      {formData.password && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Password Strength:</span>
            <span className={`text-sm font-medium ${passwordStrength.color}`}>
              {passwordStrength.label}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                passwordStrength.strength < 2 ? 'bg-destructive' :
                passwordStrength.strength < 4 ? 'bg-warning' :
                passwordStrength.strength < 5 ? 'bg-primary' : 'bg-success'
              }`}
              style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Confirm your password"
          value={formData.confirmPassword || ''}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={16} />
        </button>
      </div>

      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="By checking this box, you agree to our terms and privacy practices"
          checked={formData.agreeToTerms || false}
          onChange={(e) => handleChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />

        <Checkbox
          label="I consent to receive product updates and coaching tips via email"
          description="Optional: Stay informed about new features and coaching best practices"
          checked={formData.marketingConsent || false}
          onChange={(e) => handleChange('marketingConsent', e.target.checked)}
        />

        <Checkbox
          label="Enable two-factor authentication (recommended)"
          description="Add an extra layer of security to protect your coaching data"
          checked={formData.enableTwoFactor || false}
          onChange={(e) => handleChange('enableTwoFactor', e.target.checked)}
        />
      </div>

      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Security Promise</h4>
            <p className="text-sm text-muted-foreground">
              Your coaching data is encrypted end-to-end and stored securely. We never share 
              personal information and comply with all privacy regulations including GDPR and CCPA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurityStep;