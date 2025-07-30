import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import FeatureHighlights from './components/FeatureHighlights';
import BetaSignupSection from './components/BetaSignupSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Rafiki - Your AI-Powered Coaching Assistant</title>
        <meta name="description" content="From session summaries to client tracking – everything in one place. Join the beta for Rafiki, the AI-powered coaching platform." />
      </Helmet>
      
      <div className="min-h-screen bg-white">
        <HeroSection />
        <FeatureHighlights />
        <BetaSignupSection />
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;