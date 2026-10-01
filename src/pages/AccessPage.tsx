import React from 'react';
import { KeyRound } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const AccessPage: React.FC = () => {
  return (
    <EmptyState
      icon={KeyRound}
      category="Others"
      title="No Team Access Configured"
      description="Manage team members, assign roles, and control who can view or edit each marketing channel, report, and task board within this client workspace."
      actionText="Invite Team Member"
      secondaryActionText="Manage Roles & Permissions"
      tips={[
        'Define granular access per channel (Website, Paid Media, Reports, etc.).',
        'This page is structured in your navigation hierarchy ready for team access management.',
      ]}
    />
  );
};
