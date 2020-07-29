import * as React from 'react';
import Select from '@synerise/ds-select';
import InputNumber from '@synerise/ds-input-number';
import * as S from '../../../RelativeRangePicker.styles';
import * as CONST from '../../../../constants';
import { setOffsetType } from '../CustomRangeForm';
import { Props } from './OffsetField.types';
import { GROUPS } from '../../../utils';

const OffsetField: React.FC<Props> = ({
  handleOffsetValueChange,
  currentGroup,
  handleChange,
  currentRange,
  intl,
}: Props) => {
  const { offset } = currentRange;
  return (
    <>
      {' '}
      <S.Title>
        {intl.formatMessage({
          id: currentGroup === GROUPS.PAST ? 'DS.DATE-RANGE-PICKER.BEFORE' : 'DS.DATE-RANGE-PICKER.AFTER',
        })}
      </S.Title>
      <S.InputSelectGroup compact>
        <InputNumber
          min={1}
          max={CONST.RELATIVE_OFFSET_MAX}
          precision={0}
          step={1}
          value={offset.value}
          onBlur={({ target: { value } }): void => {
            !value && handleOffsetValueChange(0);
          }}
          onChange={handleOffsetValueChange}
        />
        <Select value={offset.type} onChange={(type): void => handleChange(setOffsetType(type, currentRange))}>
          {CONST.RELATIVE_TYPES.map(type => (
            <Select.Option key={type} value={type}>
              {intl.formatMessage({ id: `DS.DATE-RANGE-PICKER.${type.toUpperCase()}` })}
            </Select.Option>
          ))}
        </Select>
      </S.InputSelectGroup>
    </>
  );
};

export default OffsetField;
