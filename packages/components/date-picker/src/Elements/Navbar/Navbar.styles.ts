import styled from 'styled-components';
import { ThemeProps } from '@synerise/ds-core/dist/js/DSProvider/ThemeProvider/theme';
import Button from '@synerise/ds-button';


export const NavButton = styled(Button)<{ hidden?: boolean }>`
  .ds-icon > svg {
    fill: ${(props): string => props.theme.palette['grey-600']};
  }
`;

export const ArrowPlaceholder = styled.div`
  width: 32px;
  height: 32px;
`;

export const ArrowContainer = styled.div<{ hidden?: boolean }>`
  display: flex;
  align-items: center;
  ${NavButton}, ${ArrowPlaceholder}{
    margin-right: 8px;
  }
`;


export const Container = styled.div<{ smallMargin?: boolean }>`
  display: flex;
  align-items: center;
  margin: 0 24px;
  ${NavButton}:last-of-type {
    margin-right: 0;
  }
`;



export const Text = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
`;
export const Link = styled.span`
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    color: ${(props: ThemeProps): string => props.theme.palette['blue-600']};
  }

  &:active {
    color: ${(props: ThemeProps): string => props.theme.palette['blue-600']};
  }
`;
