import * as React from 'react';

import DateRangePicker from '@synerise/ds-date-range-picker';
import { boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Daily from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Daily/Daily';
import Weekly from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/Weekly/Weekly';
import { TimePickerProps } from '@synerise/ds-time-picker/dist/TimePicker.types';
import {
  DEFAULT_RANGE_END,
  DEFAULT_RANGE_START,
} from '@synerise/ds-date-range-picker/dist/RangeFilter/Filters/new/constants';
import {
  Check3M,
  HelpFillM,
  InfoFillM,
  NotificationsReceiveM,
  UpdateDataM,
  UserCheckM,
  WarningFillM,
} from '@synerise/ds-icon';

const decorator = storyFn => (
  <div style={{ width: '100vw', position: 'absolute', left: '0', top: '5vh' }}>
    <div style={{ width: '340px', margin: 'auto' }}>{storyFn()}</div>
  </div>
);
const CUSTOM_COLORS = [
  '',
  'grey',
  'blue',
];
const POPOVER_PLACEMENT = {
  topLeft: 'topLeft',
  topRight: 'topRight',
  bottomLeft: 'bottomLeft',
  bottomRight: 'bottomRight',
  leftTop: 'leftTop',
  leftBottom: 'leftBottom',
  rightTop: 'rightTop',
  rightBottom: 'rightBottom',
};
const additionalMapper = {
  topLeft: 'green',
  topRight: 'yellow',
  bottomLeft: 'red',
  bottomRight: 'blue',
  leftTop: 'grey',
  leftBottom: 'violet',
  rightTop: 'purple',
  rightBottom: 'cyan',
};

export const TIME_PICKER_PROPS: Partial<TimePickerProps> = {
  containerStyle: { width: '268px', maxWidth: 'none' },
  units: ['hour', 'minute'],
  timeFormat: 'HH:mm',
};

const savedFilters = [];
const texts = {
  custom: 'Custom',
  today: 'Today',
  yesterday: 'Yesterday',
  apply: 'Apply',
  endDatePlaceholder: 'End date',
  startDatePlaceholder: 'Start date',
  clear: 'Clear',
  now: 'Now',
  selectDate: 'Select date',
  emptyDateError: 'Date cannot be empty',
  last7Days: 'Last 7 days',
  thisWeek: 'This week',
  lastWeek: 'Last week',
  thisMonth: 'This month',
  lastMonth: 'Last month',
  last3Months: 'Last 3 months',
  last6Months: 'Last 6 months',
  lastYear: 'Last year',
  allTime: 'Lifetime',
  tomorrow: 'Tomorrow',
  next7Days: 'Next 7 days',
  nextWeek: 'Next week',
  nextMonth: 'Next month',
  next3Months: 'Next 3 months',
  next6Months: 'Next 6 months',
  nextYear: 'Next year',
  more: 'More',
  relativeDateRange: 'Relative date range',
  last: 'Last',
  before: 'before',
  after: 'after',
  since: 'Since',
  next: 'Next',
  seconds: 'Seconds',
  minutes: 'Minutes',
  hours: 'Hours',
  days: 'Days',
  weeks: 'Weeks',
  months: 'Months',
  years: 'Years',
  timestampLast: 'Last',
  timestampNext: 'Next',
  timestampTill: 'till',
  filter: 'Date filter',
  selectTime: 'Select time',
  startDate: 'Start date',
  endDate: 'End date',
  remove: 'Remove',
  clearRange: ' Clear range',
  savedFiltersTrigger: 'Saved filters',
  copyRange: 'Copy range',
  pasteRange: 'Paste range',
};

const stories = {
  default: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const setCustomArrowColor = boolean('Set custom arrow color', false);
    const setPlacement = select('Set placement of popover', POPOVER_PLACEMENT, 'bottomLeft');
    const modesObj = {
      PAST: boolean('Set relative past mode', true),
      FUTURE: boolean('Set relative future mode', true),
      SINCE: boolean('Set relative since mode', true),
    };
    const getRelativeModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={texts}
        popoverProps={{ placement: setPlacement}}
        arrowColor={setCustomArrowColor && additionalMapper}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  },
  withDateFilter: () => {
    const value = undefined;
    const showTime = boolean('Set showTime', true);
    const modesObj = {
      PAST: boolean('Set relative past mode', true),
      FUTURE: boolean('Set relative future mode', true),
      SINCE: boolean('Set relative since mode', true),
    };
    const getRelativeModes = (modesObject: object) => {
      const keys = Object.keys(modesObject);
      const enabledModes = keys.filter(k => !!modesObject[k]);
      return enabledModes;
    };
    const [filters, setFilters] = React.useState(savedFilters);
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        savedFilters={filters}
        onFilterSave={setFilters}
        texts={{
          ...texts,
          startDatePlaceholder: 'Start date',
          endDatePlaceholder: 'End date',
          clear: 'Clear',
          emptyDateError: 'Date cannot be empty',
        }}
        popoverProps={{ placement: 'bottomLeft' }}
        forceAdjacentMonths={boolean('Set adjacent months', false)}
        showFilter={true}
        relativeModes={getRelativeModes(modesObj)}
      />
    );
  },
  withStartDate: () => {
    const value = {
      filter: undefined,
      from: '2020-08-18T22:00:00.000Z',
      to: undefined,
      type: 'ABSOLUTE',
    };
    const showTime = boolean('Set showTime', true);
    const showRelativePicker = boolean('Set relative filter', true);
    return (
      <DateRangePicker
        onApply={action('OnApply')}
        showTime={showTime}
        value={value}
        relativeFuture
        forceAbsolute
        showRelativePicker={showRelativePicker}
        texts={texts}
        popoverProps={{ placement: 'bottomLeft' }}
      />
    );
  },
  dailyDateFilter: () => {
    const disabled = boolean('Set disabled', false);

    const [value, setValue] = React.useState([
      {
        start: DEFAULT_RANGE_START,
        stop: DEFAULT_RANGE_END,
        restricted: false,
        display: false,
        inverted: false,
        mode: 'Hour',
      },
    ]);

    return <Daily timePickerProps={TIME_PICKER_PROPS} onChange={setValue} value={value} disabled={disabled} />;
  },
  weeklyDateFilter: () => {
    const disabled = boolean('Set disabled', false);
    const [value, setValue] = React.useState({});
    return <Weekly timePickerProps={TIME_PICKER_PROPS} onChange={setValue} value={value} disabled={disabled} />;
  },
};

export default {
  name: 'Components/Pickers/DateRangePicker',
  config: {},
  component: DateRangePicker,
  stories,
  decorator,
};
