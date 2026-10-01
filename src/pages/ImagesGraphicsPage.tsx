import React from 'react';
import { Image, Upload } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const ImagesGraphicsPage: React.FC = () => {
  return (
    <EmptyState
      icon={Image}
      category="Creative Assets"
      title="No Images or Graphic Assets Stored"
      description="Upload, organize, and manage display ad graphics, social banners, website illustrations, logos, and infographic deliverables."
      actionText="Upload Graphic Asset"
      secondaryActionText="Connect Google Drive / Dropbox"
      tips={[
        'Media files and design graphics were not included in the single-page text/metric audit.',
        'Assets stored here can be referenced in Paid Media and Social Media campaigns.',
      ]}
    />
  );
};
