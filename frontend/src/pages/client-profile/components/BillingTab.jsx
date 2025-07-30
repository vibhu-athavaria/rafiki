import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BillingTab = ({ client }) => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const billingData = [
    { month: 'Aug', amount: 800, sessions: 4 },
    { month: 'Sep', amount: 1200, sessions: 6 },
    { month: 'Oct', amount: 1000, sessions: 5 },
    { month: 'Nov', amount: 1400, sessions: 7 },
    { month: 'Dec', amount: 1200, sessions: 6 },
    { month: 'Jan', amount: 1600, sessions: 8 }
  ];

  const invoices = [
    {
      id: 'INV-2025-001',
      date: '2025-01-28',
      dueDate: '2025-02-12',
      amount: 1600,
      status: 'paid',
      paymentDate: '2025-01-30',
      paymentMethod: 'Credit Card',
      sessions: [
        { date: '2025-01-07', description: 'Leadership Coaching Session', amount: 200 },
        { date: '2025-01-14', description: 'Goal Setting Workshop', amount: 200 },
        { date: '2025-01-21', description: 'Time Management Coaching', amount: 200 },
        { date: '2025-01-28', description: 'Progress Review Session', amount: 200 }
      ],
      subtotal: 800,
      tax: 80,
      total: 880
    },
    {
      id: 'INV-2024-012',
      date: '2024-12-28',
      dueDate: '2025-01-12',
      amount: 1200,
      status: 'paid',
      paymentDate: '2025-01-10',
      paymentMethod: 'Bank Transfer',
      sessions: [
        { date: '2024-12-03', description: 'Strategic Planning Session', amount: 200 },
        { date: '2024-12-10', description: 'Communication Skills Training', amount: 200 },
        { date: '2024-12-17', description: 'Year-End Review Session', amount: 200 },
        { date: '2024-12-24', description: 'Goal Setting for New Year', amount: 200 }
      ],
      subtotal: 800,
      tax: 80,
      total: 880
    },
    {
      id: 'INV-2024-011',
      date: '2024-11-28',
      dueDate: '2024-12-12',
      amount: 1400,
      status: 'paid',
      paymentDate: '2024-12-08',
      paymentMethod: 'Credit Card',
      sessions: [
        { date: '2024-11-05', description: 'Leadership Assessment', amount: 250 },
        { date: '2024-11-12', description: 'Team Management Coaching', amount: 200 },
        { date: '2024-11-19', description: 'Conflict Resolution Training', amount: 200 },
        { date: '2024-11-26', description: 'Performance Review Prep', amount: 200 }
      ],
      subtotal: 850,
      tax: 85,
      total: 935
    },
    {
      id: 'INV-2024-010',
      date: '2024-10-28',
      dueDate: '2024-11-12',
      amount: 1000,
      status: 'overdue',
      sessions: [
        { date: '2024-10-01', description: 'Monthly Coaching Session', amount: 200 },
        { date: '2024-10-08', description: 'Skills Assessment', amount: 200 },
        { date: '2024-10-15', description: 'Career Planning Session', amount: 200 },
        { date: '2024-10-22', description: 'Progress Review', amount: 200 },
        { date: '2024-10-29', description: 'Action Planning', amount: 200 }
      ],
      subtotal: 1000,
      tax: 100,
      total: 1100
    }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'Credit Card',
      last4: '4242',
      brand: 'Visa',
      expiry: '12/26',
      isDefault: true
    },
    {
      id: 2,
      type: 'Bank Account',
      last4: '1234',
      bank: 'Chase Bank',
      isDefault: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'overdue':
        return 'bg-error text-error-foreground';
      case 'draft':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalRevenue = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidInvoices = invoices.filter(inv => inv.status === 'paid');
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');

  return (
    <div className="space-y-6">
      {/* Billing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="DollarSign" size={24} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-muted-foreground">Total Revenue</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="CheckCircle" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{paidInvoices.length}</p>
          <p className="text-sm text-muted-foreground">Paid Invoices</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="AlertTriangle" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{overdueInvoices.length}</p>
          <p className="text-sm text-muted-foreground">Overdue</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <Icon name="Calendar" size={24} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">$200</p>
          <p className="text-sm text-muted-foreground">Hourly Rate</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={billingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                formatter={(value) => [formatCurrency(value), 'Revenue']}
              />
              <Bar dataKey="amount" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Invoices List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Invoices</h3>
            <Button variant="default" iconName="Plus" size="sm">
              Create Invoice
            </Button>
          </div>

          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className={`bg-card border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedInvoice?.id === invoice.id ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
                onClick={() => setSelectedInvoice(invoice)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{invoice.id}</h4>
                    <p className="text-sm text-muted-foreground">
                      Issued: {formatDate(invoice.date)} • Due: {formatDate(invoice.dueDate)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{formatCurrency(invoice.amount)}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{invoice.sessions.length} sessions</span>
                  {invoice.paymentDate && (
                    <span>Paid: {formatDate(invoice.paymentDate)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Details / Payment Methods */}
        <div className="space-y-6">
          {selectedInvoice ? (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Invoice Details</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Download">
                    Download
                  </Button>
                  <Button variant="outline" size="sm" iconName="Send">
                    Send
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <div>
                    <h4 className="font-medium text-foreground">{selectedInvoice.id}</h4>
                    <p className="text-sm text-muted-foreground">
                      Issued: {formatDate(selectedInvoice.date)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status.charAt(0).toUpperCase() + selectedInvoice.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">Sessions</h5>
                  {selectedInvoice.sessions.map((session, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">{session.description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(session.date)}</p>
                      </div>
                      <span className="text-sm font-medium text-foreground">{formatCurrency(session.amount)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatCurrency(selectedInvoice.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="text-foreground">{formatCurrency(selectedInvoice.tax)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">{formatCurrency(selectedInvoice.total)}</span>
                  </div>
                </div>

                {selectedInvoice.paymentDate && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success" />
                      <span className="text-sm font-medium text-success">
                        Paid on {formatDate(selectedInvoice.paymentDate)}
                      </span>
                    </div>
                    <p className="text-xs text-success/80 mt-1">
                      Payment method: {selectedInvoice.paymentMethod}
                    </p>
                  </div>
                )}

                {selectedInvoice.status === 'overdue' && (
                  <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <span className="text-sm font-medium text-error">
                        Overdue by {Math.ceil((new Date() - new Date(selectedInvoice.dueDate)) / (1000 * 60 * 60 * 24))} days
                      </span>
                    </div>
                    <Button variant="destructive" size="sm" className="mt-3" fullWidth>
                      Send Reminder
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Select an Invoice</h3>
              <p className="text-muted-foreground">Choose an invoice from the list to view detailed information.</p>
            </div>
          )}

          {/* Payment Methods */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Payment Methods</h3>
              <Button variant="outline" size="sm" iconName="Plus">
                Add Method
              </Button>
            </div>

            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={method.type === 'Credit Card' ? 'CreditCard' : 'Building2'} size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {method.type === 'Credit Card' ? `${method.brand} ****${method.last4}` : `${method.bank} ****${method.last4}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {method.type === 'Credit Card' ? `Expires ${method.expiry}` : 'Bank Account'}
                        {method.isDefault && ' • Default'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingTab;