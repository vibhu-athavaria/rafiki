import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const EmailVerificationStep = ({ formData, onVerificationComplete }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleVerifyCode = () => {
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6) {
      setError('Verification code must be 6 digits');
      return;
    }

    // Mock verification - in real app, this would call an API
    if (verificationCode === '123456') {
      setError('');
      onVerificationComplete();
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError('');
    
    // Mock API call
    setTimeout(() => {
      setIsResending(false);
      setResendCooldown(60);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleVerifyCode();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Mail" size={32} className="text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Verify Your Email</h3>
        <p className="text-muted-foreground">
          We've sent a 6-digit verification code to
        </p>
        <p className="font-medium text-foreground">{formData.email}</p>
      </div>

      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Check Your Email</h4>
            <p className="text-sm text-muted-foreground">
              The verification code should arrive within a few minutes. Don't forget to check 
              your spam folder if you don't see it in your inbox.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Verification Code"
          type="text"
          placeholder="Enter 6-digit code"
          value={verificationCode}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
            setVerificationCode(value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={error}
          maxLength={6}
          className="text-center text-lg tracking-widest"
          required
        />

        <Button
          onClick={handleVerifyCode}
          disabled={!verificationCode || verificationCode.length !== 6}
          fullWidth
          size="lg"
        >
          Verify Email Address
        </Button>
      </div>

      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Didn't receive the code?
        </p>
        
        <Button
          variant="ghost"
          onClick={handleResendCode}
          disabled={isResending || resendCooldown > 0}
          loading={isResending}
        >
          {resendCooldown > 0 
            ? `Resend in ${resendCooldown}s` 
            : 'Resend Verification Code'
          }
        </Button>

        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">
            Need to change your email address?
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
          >
            Start Over
          </Button>
        </div>
      </div>

      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-success mb-1">Almost There!</h4>
            <p className="text-sm text-success/80">
              Once verified, you'll have full access to your Rafiki coaching dashboard 
              and can start your first AI-powered session analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Mock credentials for testing */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
        <p className="text-xs text-warning font-medium mb-1">Beta Testing:</p>
        <p className="text-xs text-warning/80">Use code: 123456 for verification</p>
      </div>
    </div>
  );
};

export default EmailVerificationStep;