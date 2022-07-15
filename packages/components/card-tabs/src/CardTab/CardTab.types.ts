import * as React from 'react';
import { IntlShape } from 'react-intl';
import { DefaultColor } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';

export enum prefixType {
  TAG,
  ICON,
  DOT,
}

export type Color =
  | 'red'
  | 'green'
  | 'grey'
  | 'yellow'
  | 'blue'
  | 'pink'
  | 'mars'
  | 'orange'
  | 'fern'
  | 'cyan'
  | 'purple'
  | 'violet';

export type CardTabTexts = {
  changeNameTooltip?: string | React.ReactNode;
  removeTooltip?: string | React.ReactNode;
  duplicateTooltip?: string | React.ReactNode;
};

export interface CardTabProps {
  intl: IntlShape;
  id: number;
  name: string;
  tag: string;
  prefix: prefixType;
  colorDot: React.ReactNode;
  color?: Color | DefaultColor | string;
  active?: boolean;
  draggable?: boolean;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  disabled?: boolean;
  invalid?: boolean;
  invalidName?: boolean;
  greyBackground?: boolean;
  onSelectTab?: (id: number) => void;
  onChangeName?: (id: number, name: string) => void;
  onDuplicateTab?: (id: number) => void;
  onRemoveTab?: (id: number) => void;
  texts?: CardTabTexts;
  itemData?: unknown;
}
