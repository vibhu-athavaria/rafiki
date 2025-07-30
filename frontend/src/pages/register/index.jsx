import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';

import ProgressIndicator from './components/ProgressIndicator';
import PersonalDetailsStep from './components/PersonalDetailsStep';
import CoachingCredentialsStep from './components/CoachingCredentialsStep';
import PracticeInformationStep from './components/PracticeInformationStep';
import AccountSecurityStep from './components/AccountSecurityStep';
import TrustSignals from './components/TrustSignals';
import EmailVerificationStep from './components/EmailVerificationStep';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Personal', component: PersonalDetailsStep },
    { id: 2, title: 'Credentials', component: CoachingCredentialsStep },
    { id: 3, title: 'Practice', component: PracticeInformationStep },
    { id: 4, title: 'Security', component: AccountSecurityStep }
  ];

  const totalSteps = steps.length;

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear related errors when user updates fields
    const updatedErrors = { ...errors };
    Object.keys(newData).forEach(key => {
      delete updatedErrors[key];
    });
    setErrors(updatedErrors);
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email?.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.phone?.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.title?.trim()) newErrors.title = 'Professional title is required';
        break;

      case 2:
        if (!formData.certification) newErrors.certification = 'Certification is required';
        if (formData.certification === 'other' && !formData.otherCertification?.trim()) {
          newErrors.otherCertification = 'Please specify your certification';
        }
        if (!formData.specializations || formData.specializations.length === 0) {
          newErrors.specializations = 'Please select at least one specialization';
        }
        break;

      case 3:
        if (!formData.experience) newErrors.experience = 'Experience level is required';
        if (!formData.clientVolume) newErrors.clientVolume = 'Client volume is required';
        if (!formData.practiceType) newErrors.practiceType = 'Practice type is required';
        if (!formData.sessionFormat) newErrors.sessionFormat = 'Session format is required';
        if (!formData.sessionDuration) {
          newErrors.sessionDuration = 'Session duration is required';
        } else if (formData.sessionDuration < 15 || formData.sessionDuration > 180) {
          newErrors.sessionDuration = 'Session duration must be between 15-180 minutes';
        }
        break;

      case 4:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowEmailVerification(true);
    }, 2000);
  };

  const handleEmailVerificationComplete = () => {
    // Mock successful registration
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep - 1].component;
    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
    );
  };

  if (showEmailVerification) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Verify Email - Rafiki</title>
          <meta name="description" content="Verify your email address to complete your Rafiki registration" />
        </Helmet>

        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-foreground">Rafiki</span>
              </Link>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Already have an account?</span>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 py-12">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <EmailVerificationStep
              formData={formData}
              onVerificationComplete={handleEmailVerificationComplete}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Join Rafiki - Professional Coaching Platform</title>
        <meta name="description" content="Join Rafiki's beta program and transform your coaching practice with AI-powered insights and session management." />
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Rafiki</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Registration Form */}
            <div className="lg:col-span-2">
              <div className="max-w-md mx-auto lg:max-w-none">
                <div className="bg-card border border-border rounded-lg shadow-sm p-6 lg:p-8">
                  <div className="mb-8">
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                      Join Rafiki Beta
                    </h1>
                    <p className="text-muted-foreground">
                      Transform your coaching practice with AI-powered insights and seamless session management.
                    </p>
                  </div>

                  <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                    steps={steps}
                  />

                  <form onSubmit={(e) => e.preventDefault()}>
                    {getCurrentStepComponent()}

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      {currentStep > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevious}
                          iconName="ChevronLeft"
                          iconPosition="left"
                          className="sm:w-auto"
                        >
                          Previous
                        </Button>
                      )}
                      
                      <Button
                        type="button"
                        onClick={handleNext}
                        loading={isSubmitting}
                        iconName={currentStep === totalSteps ? 'UserPlus' : 'ChevronRight'}
                        iconPosition={currentStep === totalSteps ? 'left' : 'right'}
                        className="flex-1 sm:flex-none sm:ml-auto"
                        size="lg"
                      >
                        {currentStep === totalSteps ? 'Create Account' : 'Continue'}
                      </Button>
                    </div>
                  </form>

                  {/* Additional Links */}
                  <div className="mt-8 pt-6 border-t border-border text-center">
                    <p className="text-sm text-muted-foreground">
                      By registering, you agree to our{' '}
                      <Link to="/terms" className="text-primary hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-primary hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Signals Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-primary-foreground"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Rafiki. All rights reserved.
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Help
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Contact
              </Link>
              <Link to="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                Status
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;