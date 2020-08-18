import { CollectorTexts } from '../../Collector.types';

export type OptionsDropdownProps = {
  showAddButton?: boolean;
  options: React.ReactText[];
  visible?: boolean;
  value: React.ReactText;
  onSelect: (value: React.ReactText) => void;
  onClick: () => void;
  texts: CollectorTexts;
  width: number;
  showNavigationHints?: boolean;
};
