import { partial } from 'lodash';
import * as React from 'react';
import Button from '@synerise/ds-button';
import Dropdown from '@synerise/ds-dropdown';
import Icon from '@synerise/ds-icon';
import Menu from '@synerise/ds-menu';
import { Close2M, SortAscendingM, SortDescendingM, SortAzM, SortZaM } from '@synerise/ds-icon/dist/icons';
import { DSColumnType } from '../Table.types';
import { TableLocaleContext } from '../utils/locale';
import { SortStateAPI, toSortOrder } from './useSortState';
import { CheckIcon, DefaultSortIcon, StringSortIcon } from './SortIcons';

interface SortRendererProps<T> {
  sortStateApi: SortStateAPI;
  column: DSColumnType<T>;
}

const getPopupParent = (triggerNode: HTMLElement): HTMLElement =>
  // dropdown target node must be resolved relatively to triggerNode (which comes from getPopupContainer)
  // go up to <th> due to possible columns ellipsis overflow
  triggerNode.parentElement?.parentElement?.parentElement?.parentElement as HTMLElement;

export const CommonRenderer = <T extends unknown>({
  column,
  sortStateApi,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);

  return (
    <TableLocaleContext.Consumer>
      {(locale): React.ReactElement => (
        <Dropdown
          getPopupContainer={getPopupParent}
          overlay={
            <Dropdown.Wrapper style={{ width: 220 }}>
              <Menu
                asDropdownMenu
                onClick={({ key }): void => {
                  onSortOrderChange(toSortOrder(key));
                }}
                style={{ width: 220 }}
              >
                <Menu.Item
                  key="ascend"
                  prefixel={<Icon component={<SortAscendingM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
                >
                  {locale.columnSortAscend}
                </Menu.Item>
                <Menu.Item
                  key="descend"
                  prefixel={<Icon component={<SortDescendingM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
                >
                  {locale.columnSortDescend}
                </Menu.Item>
                {!!columnSortOrder && (
                  <Menu.Item key="null" type="danger" prefixel={<Icon component={<Close2M />} />}>
                    {locale.columnSortClear}
                  </Menu.Item>
                )}
              </Menu>
            </Dropdown.Wrapper>
          }
        >
          <Button type="ghost" mode="single-icon">
            <DefaultSortIcon sortOrder={columnSortOrder} />
          </Button>
        </Dropdown>
      )}
    </TableLocaleContext.Consumer>
  );
};

export const StringRenderer = <T extends unknown>({
  column,
  sortStateApi,
}: SortRendererProps<T>): React.ReactElement => {
  const { getColumnSortOrder, setColumnSortOrder } = sortStateApi;
  const columnKey = String(column.key);
  const columnSortOrder = column.key ? getColumnSortOrder(columnKey) : null;
  const onSortOrderChange = partial(setColumnSortOrder, columnKey);

  return (
    <TableLocaleContext.Consumer>
      {(locale): React.ReactElement => (
        <Dropdown
          getPopupContainer={getPopupParent}
          overlay={
            <Dropdown.Wrapper style={{ width: 170 }}>
              <Menu
                asDropdownMenu
                onClick={({ key }): void => {
                  onSortOrderChange(toSortOrder(key));
                }}
                style={{ width: 170 }}
              >
                <Menu.Item
                  key="ascend"
                  prefixel={<Icon component={<SortAzM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'ascend'} />}
                >
                  {locale.columnSortAz}
                </Menu.Item>
                <Menu.Item
                  key="descend"
                  prefixel={<Icon component={<SortZaM />} />}
                  suffixel={<CheckIcon isActive={columnSortOrder === 'descend'} />}
                >
                  {locale.columnSortZa}
                </Menu.Item>
                {!!columnSortOrder && (
                  <Menu.Item key="null" type="danger" prefixel={<Icon component={<Close2M />} />}>
                    {locale.columnSortClear}
                  </Menu.Item>
                )}
              </Menu>
            </Dropdown.Wrapper>
          }
        >
          <Button type="ghost" mode="single-icon">
            <StringSortIcon sortOrder={columnSortOrder} />
          </Button>
        </Dropdown>
      )}
    </TableLocaleContext.Consumer>
  );
};
