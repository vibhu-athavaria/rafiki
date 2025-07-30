import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="text-sm text-muted-foreground">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 mb-4">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`flex items-center space-x-2 ${
              index + 1 <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
              index + 1 < currentStep 
                ? 'bg-primary text-primary-foreground' 
                : index + 1 === currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {index + 1 < currentStep ? '✓' : index + 1}
            </div>
            <span className="text-sm font-medium hidden sm:inline">{step.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;