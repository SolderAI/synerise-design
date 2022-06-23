import * as React from 'react';
import { injectIntl } from 'react-intl';

import Button from '@synerise/ds-button';
import Tooltip from '@synerise/ds-tooltip';
import Icon, { ArrowRightS } from '@synerise/ds-icon';
import * as S from './Footer.styles';
import { Props } from './Footer.types';
import fnsFormat from '../dateUtils/format';
import getDateFromString from '../dateUtils/getDateFromString';

const Footer: React.FC<Props> = ({
  canApply,
  onApply,
  intl,
  canSwitchMode,
  onSwitchMode,
  mode,
  dateOnly,
  message,
  texts,
  value,
  format,
  showTime,
  ...rest
}) => {
  const footerFormat = format || (showTime ? 'MMM D, YYYY, HH:mm' : 'MMM D, YYYY');
  const ChosenRange = React.useMemo(() => {
    if (value?.key === 'ALL_TIME') {
      return (
        <S.ChosenRange className="ds-date-range-picker-value">
          {value.translationKey ? texts[value.translationKey] ?? value.translationKey : value?.key}
        </S.ChosenRange>
      );
    }
    return (
      <S.ChosenRange className="ds-date-range-picker-value">
        {!!value && !!value.from
          ? fnsFormat(getDateFromString(value?.from), footerFormat, intl.locale)
          : texts.startDatePlaceholder}
        <Icon component={<ArrowRightS />} />
        {!!value && !!value.to
          ? fnsFormat(getDateFromString(value?.to), footerFormat, intl.locale)
          : texts.endDatePlaceholder}
      </S.ChosenRange>
    );
  }, [value, footerFormat, intl.locale, texts]);
  return (
    <S.Container className="ds-date-range-picker-footer" {...rest}>
      {ChosenRange}
      <S.ActionsPlaceholder />
      <S.Actions>
        <Tooltip title={message}>
          <Button
            disabled={!canApply}
            type="primary"
            onClick={(): void => {
              onApply && onApply();
            }}
          >
            {texts.apply}
          </Button>
        </Tooltip>
      </S.Actions>
    </S.Container>
  );
};

export default injectIntl(Footer);
