import React from 'react';
import { Zap } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { MenuId } from '../types';

interface CroPageProps {
  onNavigate: (menu: MenuId) => void;
}

export const CroPage: React.FC<CroPageProps> = ({ onNavigate }) => {
  return (
    <EmptyState
      icon={Zap}
      category="Conversion Rate Optimization"
      title="No A/B Tests or Conversion Experiments Configured"
      description="Conversion funnels, heatmap recordings, and user behavioral tests will be managed here to improve conversion rates across landing pages."
      actionText="Create New Experiment"
      secondaryActionText="View Microsoft Clarity Connection"
      onSecondaryAction={() => onNavigate('connections')}
      suggestedFromAudit={[
        {
          title: 'Microsoft Clarity Status: Connected (Active)',
          description: 'Telemetry script is already live on aizonemarketing.io collecting click maps & scroll depth recordings.',
        },
        {
          title: 'Conversion Benchmark: 0 Key Events in GA4',
          description: 'Current GA4 28-day window shows 0 key events/conversions recorded. Setting up conversion goals is recommended.',
        },
      ]}
      tips={[
        'CRO experiment results and funnel analytics were not part of the initial audit PDF.',
        'Use the Microsoft Clarity integration to start tracking drop-offs on high-traffic landing pages like /home-copy/.',
      ]}
    />
  );
};
