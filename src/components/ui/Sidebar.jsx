import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview and insights'
    },
    {
      label: 'Clients',
      path: '/client-management',
      icon: 'Users',
      description: 'Manage client relationships',
      subItems: [
        { label: 'All Clients', path: '/client-management' },
        { label: 'Client Profile', path: '/client-profile' }
      ]
    },
    {
      label: 'Calendar',
      path: '/calendar-scheduling',
      icon: 'Calendar',
      description: 'Schedule and manage sessions'
    },
    {
      label: 'AI Assistant',
      path: '/ai-chat-assistant',
      icon: 'Bot',
      description: 'AI-powered coaching insights'
    }
  ];

  // Handle mobile menu close on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Load collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState));
  };

  const isActiveRoute = (path) => {
    if (path === '/client-management') {
      return location.pathname === '/client-management' || location.pathname === '/client-profile';
    }
    return location.pathname === path;
  };

  const hasActiveSubItem = (item) => {
    if (!item.subItems) return false;
    return item.subItems.some(subItem => location.pathname === subItem.path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-[1100] bg-black/50 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 z-[1100] bg-card border-r border-border transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-72'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-primary-foreground"
                    fill="currentColor"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-foreground">Rafiki</span>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapsed}
              className="hidden lg:flex"
            >
              <Icon
                name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
                size={16}
              />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.path);
              const hasActiveSub = hasActiveSubItem(item);
              const showSubItems = !isCollapsed && (isActive || hasActiveSub);

              return (
                <div key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={`flex-shrink-0 ${
                        isActive ? 'text-primary-foreground' : ''
                      }`}
                    />
                    {!isCollapsed && (
                      <>
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className={`text-xs mt-0.5 ${
                            isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                          }`}>
                            {item.description}
                          </div>
                        </div>
                        {item.subItems && (
                          <Icon
                            name={showSubItems ? 'ChevronDown' : 'ChevronRight'}
                            size={16}
                            className="flex-shrink-0"
                          />
                        )}
                      </>
                    )}
                  </Link>

                  {/* Sub Items */}
                  {showSubItems && item.subItems && (
                    <div className="ml-6 mt-1 space-y-1 animate-fade-in">
                      {item.subItems.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        return (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                              isSubActive
                                ? 'bg-muted text-foreground font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60"></div>
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="bg-muted rounded-md p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">AI Insights</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Get personalized coaching recommendations based on your client interactions.
                </p>
                <Button variant="outline" size="sm" fullWidth>
                  Learn More
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="w-full"
                title="AI Insights"
              >
                <Icon name="Sparkles" size={20} className="text-accent" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-[1200] lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Icon name="Menu" size={20} />
      </Button>
    </>
  );
};

export default Sidebar;