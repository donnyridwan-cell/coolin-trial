import React from 'react';
import { Palette } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const BrandBriefPage: React.FC = () => {
  return (
    <EmptyState
      icon={Palette}
      category="Brand Identity"
      title="No Brand Brief Added Yet"
      description="Store brand identity guidelines, typography palettes, target audience personas, value propositions, and core messaging pillars for AIZone Marketing."
      actionText="Create Brand Brief"
      secondaryActionText="Import from Figma / PDF"
      tips={[
        'The technical and analytical audit PDF did not include brand guidelines.',
        'Use this section to align your design and copywriting teams with the client voice.',
      ]}
    />
  );
};
