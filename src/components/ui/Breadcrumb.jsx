import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const routeMap = {
    '/dashboard': { label: 'Dashboard', icon: 'LayoutDashboard' },
    '/client-management': { label: 'Client Management', icon: 'Users' },
    '/client-profile': { label: 'Client Profile', icon: 'User', parent: '/client-management' },
    '/calendar-scheduling': { label: 'Calendar & Scheduling', icon: 'Calendar' },
    '/ai-chat-assistant': { label: 'AI Chat Assistant', icon: 'Bot' },
    '/register': { label: 'Register', icon: 'UserPlus' },
    '/settings': { label: 'Settings', icon: 'Settings' },
    '/help': { label: 'Help', icon: 'HelpCircle' },
    '/admin': { label: 'Admin', icon: 'Shield' },
    '/profile': { label: 'Profile', icon: 'User' }
  };

  const generateBreadcrumbs = () => {
    const currentRoute = routeMap[location.pathname];
    if (!currentRoute) return [];

    const breadcrumbs = [
      { label: 'Home', path: '/dashboard', icon: 'Home' }
    ];

    // Add parent if exists
    if (currentRoute.parent) {
      const parentRoute = routeMap[currentRoute.parent];
      if (parentRoute) {
        breadcrumbs.push({
          label: parentRoute.label,
          path: currentRoute.parent,
          icon: parentRoute.icon
        });
      }
    }

    // Add current route if not dashboard
    if (location.pathname !== '/dashboard') {
      breadcrumbs.push({
        label: currentRoute.label,
        path: location.pathname,
        icon: currentRoute.icon,
        current: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't render breadcrumbs on register page or if only home
  if (location.pathname === '/register' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center">
            {index > 0 && (
              <Icon
                name="ChevronRight"
                size={14}
                className="mx-2 text-muted-foreground/60"
              />
            )}
            {crumb.current ? (
              <span className="flex items-center space-x-1.5 text-foreground font-medium">
                <Icon name={crumb.icon} size={16} />
                <span className="hidden sm:inline">{crumb.label}</span>
                <span className="sm:hidden truncate max-w-[120px]">{crumb.label}</span>
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="flex items-center space-x-1.5 hover:text-foreground transition-colors duration-200"
              >
                <Icon name={crumb.icon} size={16} />
                <span className="hidden sm:inline">{crumb.label}</span>
                <span className="sm:hidden">
                  {index === 0 ? <Icon name="Home" size={16} /> : '...'}
                </span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;