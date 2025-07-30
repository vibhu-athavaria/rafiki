import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ClientTable = ({ clients, selectedClients, onSelectClient, onSelectAll, onBulkAction }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedClients = [...clients].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (sortField === 'lastSession') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
      inactive: { bg: 'bg-warning/10', text: 'text-warning', label: 'Inactive' },
      paused: { bg: 'bg-secondary/10', text: 'text-secondary', label: 'Paused' },
      completed: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Completed' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getProgressBar = (progress) => (
    <div className="w-full bg-muted rounded-full h-2">
      <div 
        className="bg-primary h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isAllSelected = selectedClients.length === clients.length && clients.length > 0;
  const isIndeterminate = selectedClients.length > 0 && selectedClients.length < clients.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isIndeterminate;
                  }}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                />
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Client</span>
                  <Icon 
                    name={sortField === 'name' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Contact</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastSession')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Last Session</span>
                  <Icon 
                    name={sortField === 'lastSession' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Progress</th>
              <th className="text-left p-4 font-medium text-foreground">Payment</th>
              <th className="text-right p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedClients.map((client) => (
              <tr key={client.id} className="hover:bg-muted/30 transition-colors group">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedClients.includes(client.id)}
                    onChange={(e) => onSelectClient(client.id, e.target.checked)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={client.avatar}
                        alt={client.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        to="/client-profile"
                        className="font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {client.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{client.coachingType}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Mail" size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Icon name="Phone" size={14} className="text-muted-foreground" />
                      <span className="text-foreground">{client.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(client.status)}
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <p className="text-foreground font-medium">{formatDate(client.lastSession)}</p>
                    <p className="text-muted-foreground">{client.sessionCount} sessions</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Goals</span>
                      <span className="text-foreground font-medium">{client.progress}%</span>
                    </div>
                    {getProgressBar(client.progress)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <p className={`font-medium ${client.paymentStatus === 'paid' ? 'text-success' : client.paymentStatus === 'pending' ? 'text-warning' : 'text-error'}`}>
                      {client.paymentStatus === 'paid' ? 'Paid' : client.paymentStatus === 'pending' ? 'Pending' : 'Overdue'}
                    </p>
                    <p className="text-muted-foreground">${client.totalRevenue}</p>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      title="View Profile"
                    >
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      title="Edit Client"
                    >
                      <Icon name="Edit" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8"
                      title="Schedule Session"
                    >
                      <Icon name="Calendar" size={14} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-error"
                      title="Archive Client"
                    >
                      <Icon name="Archive" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No clients found</h3>
          <p className="text-muted-foreground mb-6">Get started by adding your first client to begin coaching.</p>
          <Button variant="default">
            <Icon name="Plus" size={16} className="mr-2" />
            Add Your First Client
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClientTable;