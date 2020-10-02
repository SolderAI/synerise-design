import * as React from 'react';
import { SubtleTextAreaProps } from './Elements/TextArea/TextArea.types';
import { SubtleSelectProps } from './Elements/Select/Select.types';

export type SubtleFormSubComponents = {
  TextArea: React.ElementType<SubtleTextAreaProps>;
  Select: React.ElementType<SubtleSelectProps>;
};
export type SubtleFieldProps = {
  label?: React.ReactNode | string;
  labelTooltip?: React.ReactNode | string;
  suffix?: React.ReactNode | string;
  suffixTooltip?: React.ReactNode | string;
};
