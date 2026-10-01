import React from 'react';
import { Share2 } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const SocialMediaPage: React.FC = () => {
  return (
    <EmptyState
      icon={Share2}
      category="Organic Social"
      title="No Social Accounts Linked"
      description="Connect client social media profiles (LinkedIn, Instagram, TikTok, Facebook, YouTube) to track organic follower growth, impressions, post reach, and audience engagement."
      actionText="Link Social Account"
      secondaryActionText="Learn Integration Requirements"
      tips={[
        'No organic social data was present in the single-page client audit PDF.',
        'This page is preserved according to the navigation hierarchy in your blueprint.',
        'When connected, post engagement and cross-channel community growth will appear here.',
      ]}
    />
  );
};
