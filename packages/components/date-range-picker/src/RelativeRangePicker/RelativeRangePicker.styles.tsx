import styled from 'styled-components';
import Button from '@synerise/ds-button';
import * as React from 'react';
import Menu from '@synerise/ds-menu';
import { InputGroup } from '@synerise/ds-input';
import { Props as InputGroupProps } from '@synerise/ds-input/dist/InputGroup.types';
// import 'antd/lib/input/style/index.css' // this style might be in imported scopes as we use input; not needed here, but worth to mention this

export const Container = styled.div``;

export const Header = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-weight: 500;
  margin-right: 12px;
  margin-left: 12px;
  line-height: 32px;
`;

export const Help = styled.div`
  flex: 0;
  color: ${(props): string => props.theme.palette['grey-400']};
`;

export const Ranges = styled.div`
  margin-top: 4px;
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 16px;
`;

export const CustomForm = styled.div`
  display: flex;
`;

export const InputSelectGroup = styled(InputGroup)<InputGroupProps>`
  &&,
  .ant-input-group.ant-input-group-compact&& {
    display: flex;
    align-items: center;
    .ant-input-number {
      display: flex;
      flex: 1;
    }
    .ds-select-wrapper {
      width: 122px;
    }
    height: 32px;
  }
`;

export const ModeDropdownTrigger = styled(({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type="tertiary" {...rest}>
    {children}
  </Button>
))`
  && {
    margin-right: 8px;
  }
`;

export const Range = styled(({ children, ...rest }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button type="tertiary" {...rest}>
    {children}
  </Button>
))`
  && {
    margin: 4px 0;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

export const RangeFormColumn = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  height: 62px;
`;

export const DatePickerWrapper = styled.div<{ error: boolean }>`
  width: 224px;
`;
export const DropMenu = styled(Menu)`
  padding: 0 8px 0 0;
`;
export const DropMenuItem = styled(Menu.Item)`
  max-height: 32px;
  .ds-icon {
    margin-right: -6px;
  }
`;
export const OverlayWrapper = styled.div<{ visible?: boolean; width?: number }>`
  position: absolute;
  bottom: 40px;
  padding: 8px 0 8px 8px;
  background-color: ${(props): string => props.theme.palette.white};
  display: ${(props): string => (props.visible ? 'flex' : 'none')};
  z-index: 15;
  box-shadow: 0 4px 12px 0 rgba(35, 41, 54, 0.09);
  ${(props): false | string => !!props.width && `width:${props.width}px;`}
  &, & > ul {
    border-radius: 3px;
  }
  .scrollbar-container > .ps__rail-y > .ps__thumb-y {
    transform: translateX(1px) !important;
  }
`;
export const DropdownContainer = styled.div`
  position: relative;
`;
