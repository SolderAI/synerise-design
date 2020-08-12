import * as React from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Badge from 'antd/lib/badge';
import { macro } from '@synerise/ds-typography';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import { BadgeProps } from './Badge';

const getBackgroundColor = (props: ThemeProps & Pick<BadgeProps, 'backgroundColor' | 'backgroundColorHue'>): string => {
  if (props.backgroundColor === 'transparent') return 'transparent';
  if (props.backgroundColor === 'white') return props.theme.palette.white;
  return props.theme.palette[`${props.backgroundColor}-${props.backgroundColorHue}`];
};

// eslint-disable-next-line react/jsx-props-no-spreading
export default styled(({ flag, outlined, backgroundColor, textColor, backgroundColorHue, textColorHue, ...rest }) => (
  <Badge {...rest} />
))`
&& {
  .ant-scroll-number-only{
    height: 16px;
    & > p {
      ${macro.h200};
      color: inherit;
      line-height: 16px;
      height: 16px;
    }
  }
  .ant-badge-count {
    box-shadow: none;
    height: 16px;
    padding: 0 3px;
    line-height: 16px;
    min-width: 16px;
    font-size:13px;
    font-weight: 500;
    background-color: ${(props): string => getBackgroundColor(props)};
    color: ${(props): string => props.theme.palette[`${props.textColor}-${props.textColorHue}`]};
  }
  ${(props): FlattenSimpleInterpolation | false =>
    css`
      ${props.status === 'active' &&
        css`
          .ant-badge-status-active {
            background-color: ${props.theme.palette['green-600']};
          }
        `}
        ${props.status === 'inactive' &&
          css`
            .ant-badge-status-inactive {
              background-color: ${props.theme.palette['grey-400']};
            }
          `}
      ${props.status === 'blocked' &&
        css`
          .ant-badge-status-blocked {
            background-color: ${props.theme.palette['red-600']};
          }
        `}
        ${props.status === 'processing' &&
          css`
            .ant-badge-status-processing {
              background-color: ${props.theme.palette['blue-600']};
            }
          `}
      ${props.outlined &&
        css`
          .ant-badge-count {
            box-shadow: 0 0 0 1px ${props.theme.palette.white};
          }
        `}
      ${(!!props.flag || !!props.status) &&
        css`
          .ant-badge-dot {
            box-shadow: none;
            &.ant-badge-status-processing {
              display: inline-block;
              position: absolute;
            }
          }
          .ant-badge-dot,
          .ant-badge-status-dot {
            overflow: visible;
            border: ${props.flag ? '0' : `2px solid ${props.theme.palette.white}`};
            width: ${props.flag ? '6px' : '10px'};
            height: ${props.flag ? '6px' : '10px'};
            &::before {
              display: flex;
              content: ${props.flag ? '""' : 'none'};
              position: absolute;
              top: 0;
              left: 0;
              width: 10px;
              height: 10px;
              background-color: inherit;
              opacity: 0.35;
              border-radius: 50%;
              transform: translate3d(-2px, -2px, 0);
            }
            &::after {
              display: flex;
              content: ${props.flag ? '""' : 'none'};
              position: absolute;
              top: 0;
              left: 0;
              width: 16px;
              height: 16px;
              background-color: inherit;
              opacity: 0.2;
              border-radius: 50%;
              transform: translate3d(-5px, -5px, 0);
              animation: none;
            }
          }
        `};
    `}
`;
