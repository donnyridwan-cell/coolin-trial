import React from 'react';
import { Video, Film } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const VideosPage: React.FC = () => {
  return (
    <EmptyState
      icon={Video}
      category="Creative Assets"
      title="No Video Creatives in Library"
      description="Store, preview, and track video marketing assets including commercial reels, TikTok/Shorts ad cuts, product explainer videos, and testimonial clips."
      actionText="Upload Video File"
      secondaryActionText="Import from Vimeo / YouTube"
      tips={[
        'Video creative assets were not part of the initial audit document.',
        'This page is structured in your navigation hierarchy ready for video production workflows.',
      ]}
    />
  );
};
