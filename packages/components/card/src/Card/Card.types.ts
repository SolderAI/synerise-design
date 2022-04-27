import * as React from 'react';

export type Backgrounds = 'white' | 'white-shadow' | 'grey' | 'grey-shadow' | 'outline';

export interface CardProps {
  raised?: boolean;
  disabled?: boolean;
  className?: string;
  lively?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  withHeader?: boolean;
  compactHeader?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  badgeSlot?: React.ReactNode;
  iconColor?: string;
  staticContent?: React.ReactNode;
  headerSideChildren?: React.ReactNode;
  onHeaderClick?: (e: React.SyntheticEvent) => void;
  withoutPadding?: boolean;
  headerBorderBottom?: boolean;
  background?: Backgrounds;
  hideContent?: boolean;
  showSideChildrenWhenHeaderHidden?: boolean;
}
