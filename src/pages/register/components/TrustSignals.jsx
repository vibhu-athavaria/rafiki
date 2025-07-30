import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      title: "Executive Coach, ICF-PCC",
      content: "Rafiki has transformed how I document sessions. The AI insights help me identify patterns I would have missed.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Life Coach, 8 years experience",
      content: "The session summaries are incredibly accurate. It\'s like having a coaching assistant that never sleeps.",
      rating: 5
    },
    {
      id: 3,
      name: "Dr. Jennifer Chen",
      title: "Leadership Development Coach",
      content: "Client progress tracking has never been easier. My clients love seeing their growth visualized.",
      rating: 5
    }
  ];

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: 'End-to-end encryption for all data'
    },
    {
      icon: 'Lock',
      title: 'GDPR Compliant',
      description: 'Full compliance with privacy regulations'
    },
    {
      icon: 'Award',
      title: 'ICF Approved',
      description: 'Meets International Coach Federation standards'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Badges */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Trusted by Professional Coaches
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={feature.icon} size={24} className="text-primary" />
              </div>
              <h4 className="font-medium text-foreground text-sm mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Beta Coach Testimonials */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          What Beta Coaches Are Saying
        </h3>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-primary-foreground">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground text-sm">{testimonial.name}</h4>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{testimonial.title}</p>
                  <p className="text-sm text-foreground">{testimonial.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-primary">500+</div>
          <div className="text-xs text-muted-foreground">Beta Coaches</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">10k+</div>
          <div className="text-xs text-muted-foreground">Sessions Analyzed</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-primary">98%</div>
          <div className="text-xs text-muted-foreground">Satisfaction Rate</div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;