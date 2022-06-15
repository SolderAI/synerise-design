import * as React from 'react';
import { ListProps } from 'react-window';
import { InputProps } from 'antd/lib/input';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type DataSetProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemRender: (item: any) => JSX.Element;
  rowHeight: number;
  title: string;
  tooltip?: string;
  visibleRows?: number;
  listProps?: Partial<ListProps>;
};

export type SearchLookupConfig = {
  parameters: string;
  recent: string;
  suggestions: string;
};

export type SearchProps<T extends AnyObject, U extends AnyObject> = {
  clearTooltip: string;
  divider?: React.ReactNode;
  dropdownMaxHeight: number;
  filterLookupKey?: string;
  inputProps?: InputProps;
  onClear: () => void;
  onParameterValueChange: (parameterValue: string, parameter: U | null) => void;
  onValueChange: (value: string) => void;
  parameters: U[];
  parametersDisplayProps: DataSetProps;
  parameterValue: string;
  placeholder: string;
  recent: T[];
  recentDisplayProps: DataSetProps;
  style?: React.CSSProperties;
  suggestions?: T[] | null;
  suggestionsDisplayProps?: DataSetProps | null;
  textLookupConfig: SearchLookupConfig;
  value: string;
  width?: number;
  hideLabel?: boolean;
  disableInput?: boolean;
  alwaysExpanded?: boolean;
};

export type SearchState<T extends AnyObject> = {
  isInputOpen: boolean;
  label: T | null | undefined;
  filteredParameters: T[];
  filteredRecent: T[];
  filteredSuggestions?: T[] | null;
  isListVisible: boolean;
  focusInputTrigger: boolean;
  toggleInputTrigger: boolean;
  isResultChosen: boolean;
  itemsListWidth: number;
  scrollbarScrollTop: number;
  moveCursorToEnd: boolean;
};

export enum SelectResultDataKeys {
  RECENT = 'recent',
  SUGGESTIONS = 'suggestions',
}
