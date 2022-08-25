import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import set from 'ramda/src/set';
import lensPath from 'ramda/src/lensPath';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { Props } from './DurationField.types';
import { RelativeUnits } from '../../../../date.types';
import { RANGES_MODE } from '../../../utils';

export const setDurationType = set(lensPath(['duration', 'type']));
const SELECT_DROPDOWN_OFFSET = -4;
const DurationField: React.FC<Props> = ({
  currentGroup,
  currentRange,
  handleChange,
  handleDurationValueChange,
  rangeUnits,
  texts,
}) => {
  const { duration } = currentRange;
  React.useEffect(() => {
    if (duration?.value < 1) {
      handleDurationValueChange(1);
    }
  }, [duration, handleDurationValueChange]);
  return (
    <>
      <S.Title>{currentGroup === RANGES_MODE.PAST ? texts.last : texts.next}</S.Title>
      <S.InputSelectGroup compact>
        <InputNumber
          min={1}
          max={CONST.RELATIVE_DURATION_MAX}
          precision={0}
          step={1}
          value={duration?.value}
          onBlur={({ target: { value } }): void => {
            !value && handleDurationValueChange(1);
          }}
          onChange={handleDurationValueChange}
          raw
        />
        <Select
          value={duration?.type}
          onChange={(type): void => handleChange(setDurationType(type, currentRange))}
          dropdownAlign={{ points: ['bl', 'tl'], offset: [0, SELECT_DROPDOWN_OFFSET] }}
          getPopupContainer={(node): HTMLElement => (node.parentElement != null ? node.parentElement : document.body)}
        >
          {((rangeUnits || CONST.RELATIVE_UNITS) as RelativeUnits[]).map(type => (
            <Select.Option key={type} value={type}>
              {texts[type.toLowerCase()]}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default DurationField;
