import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CalendarScheduling from './pages/calendar-scheduling';
import Dashboard from './pages/dashboard';
import AIChat from './pages/ai-chat-assistant';
import ClientManagement from './pages/client-management';
import ClientProfile from './pages/client-profile';
import Register from './pages/register';
import LandingPage from './pages/landing-page';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChat />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/calendar-scheduling" element={<CalendarScheduling />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-chat-assistant" element={<AIChat />} />
        <Route path="/client-management" element={<ClientManagement />} />
        <Route path="/client-profile" element={<ClientProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;