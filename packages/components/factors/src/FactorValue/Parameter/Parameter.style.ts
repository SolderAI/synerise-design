import styled from 'styled-components';
import Menu from '@synerise/ds-menu';

export const TabsWrapper = styled.div`
  width: 100%;
  padding: 0 0 8px 0;
`;
export const ContentPlaceholder = styled.div`
  height: 100px;
`;

export const ItemsList = styled(Menu)`
  width: 100%;

  .ds-factors-parameter-list {
    height: auto !important;
    max-height: 300px;
  }
`;

export const SearchResult = styled.span`
  font-weight: 400;
  color: ${(props): string => props.theme.palette['grey-500']};
`;

export const SearchResultHighlight = styled.span`
  font-weight: 500;
  color: ${(props): string => props.theme.palette['grey-700']};
`;

export const Value = styled.span`
  max-width: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;
`;
