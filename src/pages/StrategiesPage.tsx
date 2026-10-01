import React from 'react';
import { Compass } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const StrategiesPage: React.FC = () => {
  return (
    <EmptyState
      icon={Compass}
      category="Marketing Strategy"
      title="No Strategic Roadmap Uploaded"
      description="Define and review quarterly marketing plans, target milestones, keyword clusters, content production calendars, and technical SEO sprints for AIZone Marketing."
      actionText="Create Strategy Document"
      secondaryActionText="Upload Client Deck (PDF/Notion)"
      tips={[
        'The original audit document only contained analytical data and tasks, with no high-level strategic roadmap.',
        'This page is structured and ready for your agency strategy documents, OKRs, and client milestones.',
      ]}
    />
  );
};
