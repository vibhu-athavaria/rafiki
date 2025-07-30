import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ onFilterChange, onSearch, selectedClients, onBulkAction }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    engagement: '',
    payment: '',
    dateRange: ''
  });

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'paused', label: 'Paused' },
    { value: 'completed', label: 'Completed' }
  ];

  const engagementOptions = [
    { value: '', label: 'All Engagement Levels' },
    { value: 'high', label: 'High Engagement' },
    { value: 'medium', label: 'Medium Engagement' },
    { value: 'low', label: 'Low Engagement' },
    { value: 'at-risk', label: 'At Risk' }
  ];

  const paymentOptions = [
    { value: '', label: 'All Payment Status' },
    { value: 'paid', label: 'Paid' },
    { value: 'pending', label: 'Pending' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const bulkActions = [
    { value: 'send-reminder', label: 'Send Reminder', icon: 'Bell' },
    { value: 'update-status', label: 'Update Status', icon: 'Edit' },
    { value: 'export-data', label: 'Export Data', icon: 'Download' },
    { value: 'archive', label: 'Archive', icon: 'Archive' }
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      status: '',
      engagement: '',
      payment: '',
      dateRange: ''
    };
    setFilters(clearedFilters);
    setSearchTerm('');
    onFilterChange(clearedFilters);
    onSearch('');
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '') || searchTerm !== '';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1">
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search clients by name, email, or coaching type..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Icon name="Filter" size={16} className="mr-2" />
            Advanced
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Upload" size={16} className="mr-2" />
            Import
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          placeholder="Filter by status"
          options={statusOptions}
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        />
        
        <Select
          placeholder="Filter by engagement"
          options={engagementOptions}
          value={filters.engagement}
          onChange={(value) => handleFilterChange('engagement', value)}
        />
        
        <Select
          placeholder="Filter by payment"
          options={paymentOptions}
          value={filters.payment}
          onChange={(value) => handleFilterChange('payment', value)}
        />
        
        <Select
          placeholder="Filter by date range"
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(value) => handleFilterChange('dateRange', value)}
        />
      </div>

      {/* Filter Actions & Bulk Operations */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <Icon name="X" size={14} className="mr-1" />
              Clear Filters
            </Button>
          )}
          
          {selectedClients.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedClients.length} selected
              </span>
              <div className="h-4 w-px bg-border" />
              {bulkActions.map((action) => (
                <Button
                  key={action.value}
                  variant="ghost"
                  size="sm"
                  onClick={() => onBulkAction(action.value)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name={action.icon} size={14} className="mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* View Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-r-none border-r border-border bg-primary text-primary-foreground"
            >
              <Icon name="Table" size={14} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-l-none"
            >
              <Icon name="Grid3X3" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;