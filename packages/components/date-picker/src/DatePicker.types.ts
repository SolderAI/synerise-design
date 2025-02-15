import * as React from 'react';
import { IntlShape } from 'react-intl';
import { DropdownProps } from '@synerise/ds-dropdown/dist/Dropdown';

export type Props = {
  autoFocus?: boolean;
  disabled?: boolean;
  disabledDates?: (date?: Date) => boolean;
  disabledHours: number[];
  disabledMinutes: number[];
  disabledSeconds: number[];
  dropdownProps?: Partial<DropdownProps>;
  format?: string;
  intl?: IntlShape;
  onApply?: (date?: Date) => void;
  onClear?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  onValueChange?: (date?: Date) => void;
  error?: boolean;
  errorText?: string | React.ReactNode;
  popoverPlacement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  prefixel?: React.ReactNode | string;
  suffixel?: React.ReactNode | string;
  showTime?: boolean;
  texts: Texts;
  value?: Date;
  useStartOfDay?: boolean;
  useEndOfDay?: boolean;
  hideNow?: boolean;
};

export type State = {
  mode: string;
  month: Date;
  changed: boolean;
  value?: Date;
  enteredTo?: Date;
  visible?: boolean;
  texts: Texts;
};

export type Modifier = {
  start?: Date;
  end?: Date;
  entered?: Date;
  'entered-start'?: Date;
  'entered-end'?: Date;
  disabled: boolean;
};
export type Texts = {
  apply: string | React.ReactNode;
  now: string | React.ReactNode;
  inputPlaceholder?: string;
  clearTooltip?: string | React.ReactNode;
};
