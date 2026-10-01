import React from 'react';
import { FileBarChart2 } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const ReportsPage: React.FC = () => {
  return (
    <EmptyState
      icon={FileBarChart2}
      category="Reporting & Exports"
      title="No Generated PDF Reports in Archive"
      description="Schedule recurring monthly client executive summaries, crawl health digests, and automated stakeholder PDFs."
      actionText="Generate Client PDF Report"
      secondaryActionText="Configure Schedule"
      tips={[
        'Automated report archives were not populated in the initial single-page client audit.',
        'You can generate instantaneous PDF/CSV snapshots at any time from the Overview, Website, and Task DB tabs.',
      ]}
    />
  );
};
