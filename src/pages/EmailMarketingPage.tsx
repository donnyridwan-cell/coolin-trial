import React from 'react';
import { Mail } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const EmailMarketingPage: React.FC = () => {
  return (
    <EmptyState
      icon={Mail}
      category="Email Marketing"
      title="No Email Marketing Platform Connected"
      description="Connect your email service provider (Klaviyo, Mailchimp, Brevo, HubSpot) to track subscriber list growth, newsletter open rates, click-through rates, and automated welcome flows."
      actionText="Connect ESP"
      secondaryActionText="View API Documentation"
      tips={[
        'The source PDF contained technical SEO, GA4, and crawl metrics without email campaign data.',
        'This page is kept ready as a placeholder according to your custom menu outline.',
      ]}
    />
  );
};
