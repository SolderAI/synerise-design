import * as React from 'react';
import { withTheme } from 'styled-components';
import { injectIntl, WrappedComponentProps } from 'react-intl';

import Typography from '@synerise/ds-typography';
import Drawer from '@synerise/ds-drawer';
import Button from '@synerise/ds-button';
import Tabs from '@synerise/ds-tabs';
import Icon, { CloseM, SearchM } from '@synerise/ds-icon';
import Result from '@synerise/ds-result';
import SearchBar from '@synerise/ds-search-bar';
import Scrollbar from '@synerise/ds-scrollbar';
import { FixedSizeList, FixedSizeList as List, ListChildComponentProps } from 'react-window';
import FilterItem from '@synerise/ds-manageable-list/dist/Item/FilterItem/FilterItem';
import * as S from './ItemFIlter.styles';
import { ItemFilterProps } from './ItemFilter.types';

const DRAWER_WIDTH = 676;
const FILTER_ITEM_HEIGHT = 48;
const FILTER_ITEM_MARGIN_BOTTOM = 16;
const FILTER_LIST_PADDING = 24;

const ItemFilter: React.FC<ItemFilterProps & WrappedComponentProps> = ({
  visible,
  hide,
  removeItem,
  editItem,
  duplicateItem,
  selectItem,
  selectedItemId,
  intl,
  texts = {
    activateItemTitle: intl.formatMessage({ id: 'DS.ITEM-FILTER.ACTIVATE-ITEM-TITLE' }),
    activate: intl.formatMessage({ id: 'DS.ITEM-FILTER.ACTIVATE' }),
    cancel: intl.formatMessage({ id: 'DS.ITEM-FILTER.CANCEL' }),
    deleteConfirmationTitle: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-TITLE' }),
    deleteConfirmationDescription: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-DESCRIPTION' }),
    deleteConfirmationNo: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-NO', defaultMessage: 'No' }),
    deleteConfirmationYes: intl.formatMessage({ id: 'DS.ITEM-FILTER.DELETE-CONFIRMATION-YES', defaultMessage: 'Yes' }),
    noResults: intl.formatMessage({ id: 'DS.ITEM-FILTER.NO-RESULTS' }),
    searchPlaceholder: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-PLACEHOLDER' }),
    title: intl.formatMessage({ id: 'DS.ITEM-FILTER.TITLE' }),
    more: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.MORE' }),
    less: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.LESS' }),
    searchClearTooltip: intl.formatMessage({ id: 'DS.ITEM-FILTER.SEARCH-CLEAR' }),
    itemActionRename: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.ITEM-RENAME' }),
    itemActionDuplicate: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.ITEM-DUPLICATE' }),
    itemActionDelete: intl.formatMessage({ id: 'DS.MANAGABLE-LIST.ITEM-DELETE' }),
  },
  categories,
  theme,
  fetchData,
  loading,
  search,
}) => {
  const listRef = React.createRef<FixedSizeList>();

  const [listHeight, setListHeight] = React.useState(0);
  const [activeTab, setActiveTab] = React.useState(0);
  const listStyle: React.CSSProperties = { overflowX: 'unset', overflowY: 'unset' };

  const activeCategory = React.useMemo(() => {
    const category = categories[activeTab];
    return {
      ...category,
      items: selectedItemId
        ? [...category.items].sort((a, b) => {
            if (a.id === selectedItemId) {
              return -1;
            }

            if (b.id === selectedItemId) {
              return 1;
            }

            return 0;
          })
        : category.items || [],
    };
  }, [categories, activeTab, selectedItemId]);

  const RenderRow = ({ index, style }: ListChildComponentProps): React.ReactNode => {
    const item = activeCategory.items[index];
    return (
      <FilterItem
        texts={texts}
        onSelect={selectItem}
        onUpdate={editItem}
        onRemove={removeItem}
        onDuplicate={duplicateItem}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        item={item}
        selected={item.id === selectedItemId}
        searchQuery={search?.value}
        style={{
          ...style,
          height: parseFloat(style.height as string) - FILTER_ITEM_MARGIN_BOTTOM,
          top: parseFloat(style.top as string) + 24,
        }}
      >
        {item.name}
      </FilterItem>
    );
  };

  const handleScroll = ({ currentTarget }: React.SyntheticEvent<HTMLElement>): void => {
    const { scrollTop } = currentTarget;
    if (listRef.current !== null) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  return (
    <Drawer visible={visible} placement="right" width={DRAWER_WIDTH} onClose={hide}>
      <Drawer.DrawerHeaderWithoutPadding>
        <Drawer.DrawerHeader>
          <S.ItemFilterHeader>
            <Typography.Title style={{ flex: 1, margin: 0 }} level={4}>
              {texts.title}
            </Typography.Title>
            <Button type="ghost" mode="single-icon" onClick={hide} data-testid="ds-item-filter-close-button">
              <Icon component={<CloseM />} />
            </Button>
          </S.ItemFilterHeader>
          <Tabs activeTab={activeTab} tabs={categories} handleTabClick={setActiveTab} underscore />
        </Drawer.DrawerHeader>
        {search && (
          <SearchBar
            placeholder={texts.searchPlaceholder as string}
            value={search?.value}
            // eslint-disable-next-line react/jsx-handler-names
            onClearInput={search?.onClear}
            // eslint-disable-next-line react/jsx-handler-names
            onSearchChange={search?.onChange}
            clearTooltip={texts.searchClearTooltip}
            iconLeft={<Icon component={<SearchM />} color={theme.palette['grey-600']} />}
          />
        )}
      </Drawer.DrawerHeaderWithoutPadding>
      <Drawer.DrawerBody style={{ overflowY: 'hidden', flex: 1 }}>
        <Drawer.DrawerContent style={{ height: '100%', padding: 0 }}>
          <S.FiltersList
            ref={(el): void => {
              el && setListHeight(el.offsetHeight);
            }}
          >
            {activeCategory.items.length ? (
              <Scrollbar
                absolute
                loading={loading}
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                onScroll={handleScroll}
                hasMore={!search?.value && activeCategory.hasMore}
                fetchData={(): void => fetchData(activeCategory)}
                style={{ padding: '0px 24px' }}
              >
                {/*
                  //@ts-ignore */}
                <List
                  width={DRAWER_WIDTH - 2 * FILTER_LIST_PADDING}
                  height={listHeight}
                  itemCount={activeCategory.items.length}
                  itemSize={FILTER_ITEM_HEIGHT + FILTER_ITEM_MARGIN_BOTTOM}
                  style={listStyle}
                  ref={listRef}
                >
                  {/*
                    //@ts-ignore */}
                  {RenderRow}
                </List>
              </Scrollbar>
            ) : (
              <Result type="no-results" noSearchResults description={texts.noResults} />
            )}
          </S.FiltersList>
        </Drawer.DrawerContent>
      </Drawer.DrawerBody>
    </Drawer>
  );
};

export default injectIntl(withTheme(ItemFilter));
