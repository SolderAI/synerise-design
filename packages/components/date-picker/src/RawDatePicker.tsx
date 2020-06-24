import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfMonth from 'date-fns/start_of_month';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsSetDate from 'date-fns/set_date';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsSetMonth from 'date-fns/set_month';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsSetYear from 'date-fns/set_year';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsStartOfDay from 'date-fns/start_of_day';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import fnsEndOfDay from 'date-fns/end_of_day';

import { Props, State } from 'DatePicker.types';
import Footer from './Elements/Footer/Footer';
import * as S from './DatePicker.styles';
import DayPicker from './Elements/DayPicker/DayPicker';
import MonthPicker from './Elements/MonthPicker/MonthPicker';
import YearPicker from './Elements/YearPicker/YearPicker';
import fnsFormat from './format';
import TimePicker from './Elements/TimePicker/TimePicker';

import { DayBackground, DayText, DayForeground } from './Elements/DayPicker/DayPicker.styles';

class RawDatePicker extends React.Component<Props, State> {
  static defaultProps = {
    showTime: false,
    disabledHours: [],
    disabledMinutes: [],
    disabledSeconds: [],
  };

  constructor(props: Props) {
    super(props);

    // eslint-disable-next-line react/state-in-constructor
    this.state = {
      mode: 'date',
      month: fnsStartOfMonth(props.value || new Date()),
      value: props.value,
      changed: false,
      enteredTo: undefined,
    };
  }

  getSnapshotBeforeUpdate(prevProps: Readonly<Props>): null {
    const { value } = this.props;
    if (prevProps?.value !== value) {
      this.setState({
        mode: 'date',
        value,
        month: fnsStartOfMonth(value || new Date()),
        changed: false,
      });
    }
    return null;
  }

  handleChange = (value: Date | undefined): void => {
    this.setState({ value, changed: true });
  };

  handleDayMouseEnter = (day: Date): void => this.setState({ enteredTo: day });

  handleDayMouseLeave = (): void => this.setState({ enteredTo: undefined });

  handleDayClick = (day: Date, modifiers: { disabled: boolean }): void => {
    const { changed: isChanged, value } = this.state;
    const { useStartOfDay, useEndOfDay } = this.props;

    if (modifiers.disabled) return;

    let nextDateWithCurrentTime = isChanged && value ? value : new Date();
    nextDateWithCurrentTime = fnsSetYear(nextDateWithCurrentTime, day.getFullYear());
    nextDateWithCurrentTime = fnsSetMonth(nextDateWithCurrentTime, day.getMonth());
    nextDateWithCurrentTime = fnsSetDate(nextDateWithCurrentTime, day.getDate());

    if (useStartOfDay) {
      this.handleChange(fnsStartOfDay(nextDateWithCurrentTime));
    } else if (useEndOfDay) {
      this.handleChange(fnsEndOfDay(nextDateWithCurrentTime));
    } else {
      this.handleChange(nextDateWithCurrentTime);
    }
  };

  handleModeSwitch = (mode: string): void => this.setState({ mode });

  handleApply = (date: Date | undefined): void => {
    const { onApply } = this.props;
    if (!onApply) return;
    const { value } = this.state;

    if (date instanceof Date) {
      onApply(date);
      this.setState({ value: date });
    } else {
      onApply(value);
    }
  };

  handleMonthChange = (month: Date, mode: string): void => this.setState({ month, mode });

  renderDay = (day: Date): React.ReactNode => {
    const text = day.getDate();
    return (
      <>
        <DayBackground />
        <DayText data-attr={text}>{text}</DayText>
        <DayForeground />
      </>
    );
  };

  renderYearPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <YearPicker
        value={month}
        onChange={(changedMonth): void => changedMonth && this.handleMonthChange(changedMonth, 'date')}
      />
    );
  };

  renderMonthPicker = (): React.ReactNode => {
    const { month } = this.state;
    return (
      <MonthPicker
        value={month}
        onChange={(changedMonth): void => changedMonth && this.handleMonthChange(changedMonth, 'date')}
      />
    );
  };

  renderDayPicker = (): React.ReactNode => {
    const { value, enteredTo } = this.state;
    const { dateValidator } = this.props;
    const modifiers = {
      start: value,
      end: value,
      entered: enteredTo,
      'entered-start': enteredTo,
      'entered-end': enteredTo,
    };
    const selectedDays = value ? [value] : [];
    const { month } = this.state;
    return (
      <DayPicker
        fixedWeeks
        showOutsideDays
        canChangeMonth={false}
        disabledDays={dateValidator}
        selectedDays={selectedDays}
        month={month}
        title={fnsFormat(month, 'MMM YYYY')}
        renderDay={this.renderDay}
        onDayClick={this.handleDayClick}
        onDayMouseEnter={this.handleDayMouseEnter}
        onDayMouseLeave={this.handleDayMouseLeave}
        onMonthNameClick={(): void => this.handleModeSwitch('month')}
        onYearNameClick={(): void => this.handleModeSwitch('year')}
        onMonthChange={(selectedMonth: Date): void => this.handleMonthChange(selectedMonth, 'date')}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        modifiers={modifiers}
      />
    );
  };

  renderTimePicker = (): React.ReactNode => {
    const { value } = this.state;
    const { disabledHours, disabledMinutes, disabledSeconds } = this.props;

    return (
      <TimePicker
        value={value}
        onChange={this.handleChange}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
      />
    );
  };

  render(): React.ReactNode {
    const { mode, changed, value } = this.state;
    const { showTime, texts } = this.props;

    const isValid = !!value;

    let picker;
    switch (mode) {
      case 'time':
        picker = this.renderTimePicker();
        break;
      case 'date':
        picker = this.renderDayPicker();
        break;
      case 'month':
        picker = this.renderMonthPicker();
        break;
      case 'year':
        picker = this.renderYearPicker();
        break;
      default:
        picker = null;
        break;
    }

    return (
      <S.Container>
        {picker}
        <Footer
          text=""
          canApply={isValid && changed}
          onApply={this.handleApply}
          dateOnly={!showTime}
          mode={mode}
          canSwitchMode={isValid}
          onSwitchMode={(): void => this.handleModeSwitch(mode === 'time' ? 'date' : 'time')}
          texts={texts}
        />
      </S.Container>
    );
  }
}

export default RawDatePicker;
