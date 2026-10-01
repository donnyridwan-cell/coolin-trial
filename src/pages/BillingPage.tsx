import React from 'react';
import { CreditCard } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const BillingPage: React.FC = () => {
  return (
    <EmptyState
      icon={CreditCard}
      category="Others"
      title="No Billing Information Yet"
      description="Review your subscription plan, track invoices, update payment methods, and monitor usage for this client workspace all in one place."
      actionText="Add Payment Method"
      secondaryActionText="View Invoice History"
      tips={[
        'Currently on the Audit Pro Tier (score 73 · 19 findings indexed).',
        'This page is structured in your navigation hierarchy ready for billing & subscription management.',
      ]}
    />
  );
};
