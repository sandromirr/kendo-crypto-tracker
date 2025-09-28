export type FeatureColor = 'primary' | 'success' | 'warning' | 'info' | 'error';

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  color: FeatureColor;
}
