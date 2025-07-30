import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { CheckCircle, Sparkles, Users, Clock } from 'lucide-react';

const BetaSignupSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const coachingStyles = [
    'Life Coaching',
    'Business Coaching',
    'Career Coaching',
    'Health & Wellness',
    'Executive Coaching',
    'Relationship Coaching',
    'Performance Coaching',
    'Other'
  ];

  const onSubmit = (data) => {
    console.log('Beta signup data:', data);
    // Here you would typically send the data to your backend
    setIsSubmitted(true);
    reset();
    
    // Reset the success state after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="beta-signup" className="py-20 lg:py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-white font-medium">Limited Beta Access</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
              Be the First to Use{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Rafiki
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Join our exclusive invite-only beta and help shape the future of AI-powered coaching tools. 
              Limited spots available for serious coaching professionals.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center text-blue-200">
                <Users className="h-5 w-5 mr-2" />
                <span>500+ coaches in beta</span>
              </div>
              <div className="flex items-center text-blue-200">
                <Clock className="h-5 w-5 mr-2" />
                <span>Early access benefits</span>
              </div>
              <div className="flex items-center text-blue-200">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span>Free during beta</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 lg:p-12 border border-white/20"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  Welcome to the Rafiki Beta!
                </h3>
                <p className="text-blue-100 text-lg">
                  Thank you for your interest. We'll be in touch soon with your beta access details.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="text-red-300 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="coachingStyle" className="block text-white font-medium mb-2">
                    Primary Coaching Style *
                  </label>
                  <select
                    id="coachingStyle"
                    {...register('coachingStyle', { required: 'Please select your coaching style' })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="text-gray-900">Select your coaching style</option>
                    {coachingStyles.map((style) => (
                      <option key={style} value={style} className="text-gray-900">
                        {style}
                      </option>
                    ))}
                  </select>
                  {errors.coachingStyle && (
                    <p className="text-red-300 text-sm mt-1">{errors.coachingStyle.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="experience" className="block text-white font-medium mb-2">
                    Years of Coaching Experience
                  </label>
                  <select
                    id="experience"
                    {...register('experience')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="text-gray-900">Select experience level</option>
                    <option value="0-1" className="text-gray-900">0-1 years</option>
                    <option value="2-5" className="text-gray-900">2-5 years</option>
                    <option value="6-10" className="text-gray-900">6-10 years</option>
                    <option value="10+" className="text-gray-900">10+ years</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="clientCount" className="block text-white font-medium mb-2">
                    Current Number of Clients
                  </label>
                  <select
                    id="clientCount"
                    {...register('clientCount')}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm"
                  >
                    <option value="" className="text-gray-900">Select client range</option>
                    <option value="1-5" className="text-gray-900">1-5 clients</option>
                    <option value="6-15" className="text-gray-900">6-15 clients</option>
                    <option value="16-30" className="text-gray-900">16-30 clients</option>
                    <option value="30+" className="text-gray-900">30+ clients</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Join the Beta Waitlist
                </button>

                <p className="text-blue-200 text-sm text-center">
                  By signing up, you agree to receive updates about Rafiki. We respect your privacy and won't spam you.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BetaSignupSection;