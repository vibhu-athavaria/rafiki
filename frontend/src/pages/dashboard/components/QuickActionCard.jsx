import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, action, route, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success border-success/20 hover:bg-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20 hover:bg-error/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  const CardContent = () => (
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 group cursor-pointer ${getColorClasses()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        <Icon name="ArrowRight" size={20} className="text-muted-foreground group-hover:text-foreground transition-colors duration-200" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <Button variant="outline" size="sm" fullWidth>
          {action}
        </Button>
      </div>
    </div>
  );

  if (route) {
    return (
      <Link to={route}>
        <CardContent />
      </Link>
    );
  }

  return <CardContent />;
};

export default QuickActionCard;