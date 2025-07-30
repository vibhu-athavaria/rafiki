import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MessageSquare,
  FileText,
  Calendar,
  CreditCard,
  BarChart3,
  Sparkles
} from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Session Summaries",
      description: "Automatically generate comprehensive session notes and key insights from your coaching conversations."
    },
    {
      icon: MessageSquare,
      title: "Smart Coaching Assistant",
      description: "Get real-time suggestions, conversation starters, and coaching techniques tailored to each client."
    },
    {
      icon: FileText,
      title: "Customizable Client Onboarding Forms",
      description: "Create personalized intake forms that adapt to your coaching style and client needs."
    },
    {
      icon: Calendar,
      title: "Calendar Sync and Session Reminders",
      description: "Seamlessly integrate with your calendar and never miss a session with automated reminders."
    },
    // {
    //   icon: CreditCard,
    //   title: "Invoicing and Payment Tracking",
    //   description: "Streamline your billing process with automated invoicing and payment status tracking."
    // },
    {
      icon: BarChart3,
      title: "Client Progress Dashboard",
      description: "Visualize client growth and track progress with intuitive charts and milestone tracking."
    },
    {
      icon: Sparkles,
      title: "Learns and Adapts to Your Coaching Style",
      description: "Our AI learns from your preferences and coaching approach to provide increasingly personalized assistance."
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Excel as a Coach
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rafiki combines the power of AI with intuitive design to transform how you manage your coaching practice.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-200 h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                      <feature.icon className="h-7 w-7 text-blue-600 group-hover:text-purple-600 transition-colors duration-300" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;