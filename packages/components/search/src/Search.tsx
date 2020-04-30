import * as React from 'react';
import { useEffect, useState } from 'react';
import { useOnClickOutside, focusWithArrowKeys } from '@synerise/ds-utils';
import { MenuItemProps } from '@synerise/ds-menu/dist/Elements/Item/MenuItem.types';

import Scrollbar from '@synerise/ds-scrollbar';
import { hasSomeElement, getAllElementsFiltered, hasSomeElementFiltered } from './Elements/utils/searchUtils';
import * as S from './Search.styles';
import { FilterElement, SearchProps } from './Search.types';
import { SearchInput, SearchHeader, SearchItemList } from './Elements';

const MENU_WIDTH_OFFSET = 17;
const DEFAULT_VISIBLE_ROWS = 5;
const INPUT_EXPAND_ANIMATION_DURATION = 200;
const SCROLLBAR_HEIGHT_OFFSET = 20;
const Search: React.FC<SearchProps> = ({
  placeholder,
  parameters,
  recent,
  suggestions,
  onValueChange,
  value,
  parameterValue,
  onParameterValueChange,
  clearTooltip,
  width,
  dropdownMaxHeight,
  parametersDisplayProps,
  recentDisplayProps,
  suggestionsDisplayProps,
  divider,
  ...rest
}) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [label, setLabel] = useState<FilterElement | null>();
  const [filteredParameters, setFilteredParameters] = useState<FilterElement[]>();
  const [filteredRecent, setFilteredRecent] = useState<FilterElement[]>();
  const [filteredSuggestions, setFilteredSuggestions] = useState<FilterElement[]>();
  const [listVisible, setListVisible] = useState(true);
  const [focusTrigger, focusInputComponent] = useState(false);
  const [toggleTrigger, setToggleTrigger] = useState(true);
  const [resultChoosed, setResultChoosed] = useState(false);
  const [itemsListWidth, setItemListWidth] = useState(0);

  const ref = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const getSearchWrapperWidth = React.useCallback((): number => {
    if (width) {
      return width - MENU_WIDTH_OFFSET;
    }
    if (ref && ref !== null && ref.current && ref.current.clientWidth > MENU_WIDTH_OFFSET) {
      return ref.current.clientWidth - MENU_WIDTH_OFFSET;
    }
    return 0;
  }, [ref, width]);
  useEffect(() => {
    suggestions && setFilteredSuggestions(getAllElementsFiltered(suggestions, value));
  }, [suggestions, value]);
  useEffect(() => {
    parameters && setFilteredParameters(getAllElementsFiltered(parameters, value));
  }, [parameters, value]);
  useEffect(() => {
    recent && setFilteredRecent(getAllElementsFiltered(recent, value));
  }, [recent, value]);
  useOnClickOutside(ref, () => {
    if (inputOpen && !value && !label) {
      setToggleTrigger(!toggleTrigger);
    }
    setListVisible(false);
  });

  const selectFilter = React.useCallback(
    (item: FilterElement): void => {
      onValueChange('');
      setLabel(item);
      if (item.filter) {
        onValueChange(item.text);
        onParameterValueChange(item.filter);
        setResultChoosed(true);
      } else {
        onParameterValueChange(item.text);
      }
    },
    [onParameterValueChange, onValueChange]
  );

  const selectResult = React.useCallback(
    (item: FilterElement): void => {
      setResultChoosed(true);
      onValueChange(item.text);
    },
    [onValueChange]
  );

  const clearValue = React.useCallback((): void => {
    setLabel(null);
    onValueChange('');
    setFilteredParameters(parameters);
    setFilteredRecent(recent);
    setFilteredSuggestions(suggestions);
    onParameterValueChange('');
    setResultChoosed(false);
    inputRef && inputRef.current && inputRef.current.focus();
  }, [parameters, onParameterValueChange, onValueChange, suggestions, recent]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Backspace' && value === '' && inputOpen) {
        setLabel(null);
        setFilteredRecent(recent);
        onParameterValueChange('');
        return;
      }
      if (e.key === 'Enter' && inputOpen) {
        const narrowedParameters = filteredParameters && filteredParameters.length;
        const narrowedRecent = filteredRecent && filteredRecent.length;
        if (narrowedParameters === 1 && narrowedRecent === 0 && !parameterValue) {
          filteredParameters && selectFilter(filteredParameters[0]);
          setFilteredParameters(parameters);
          return;
        }
        setResultChoosed(true);
      }
    },
    [
      parameters,
      recent,
      selectFilter,
      value,
      filteredParameters,
      filteredRecent,
      inputOpen,
      onParameterValueChange,
      parameterValue,
    ]
  );
  const change = React.useCallback(
    (inputValue): void => {
      const currentValue = inputValue;
      onValueChange(currentValue);
      setResultChoosed(false);
      let isAnythingToShow;
      if (parameterValue) {
        const matchingValues = getAllElementsFiltered(suggestions, currentValue);
        setFilteredSuggestions(matchingValues);
        isAnythingToShow = matchingValues.length > 0;
      } else {
        const matchingRecent = getAllElementsFiltered(recent, currentValue);
        setFilteredRecent(matchingRecent);
        const matchingFilters = getAllElementsFiltered(parameters, currentValue);
        setFilteredParameters(matchingFilters);
        isAnythingToShow = matchingRecent.length > 0 || matchingFilters.length > 0;
      }
      setListVisible(isAnythingToShow);
    },
    [parameters, parameterValue, onValueChange, recent, suggestions]
  );
  const isListItemRendered = (): boolean => {
    let isAnythingToShow;
    if (parameterValue) {
      isAnythingToShow = hasSomeElementFiltered(suggestions, value);
    } else {
      const anyRecentItem = hasSomeElementFiltered(recent, value);
      const anyFilter = hasSomeElementFiltered(parameters, value);
      isAnythingToShow = anyFilter || anyRecentItem;
    }
    return isAnythingToShow;
  };

  const renderInputWrapper = React.useCallback(() => {
    return (
      <SearchInput
        onClick={(): void => setListVisible(true)}
        onButtonClick={(): void => {
          focusInputComponent(true);
        }}
        placeholder={placeholder}
        clearTooltip={clearTooltip}
        onChange={change}
        value={value}
        onClear={clearValue}
        onKeyDown={onKeyDown}
        closeOnClickOutside={false}
        filterLabel={label}
        focusTrigger={focusTrigger}
        onToggle={(toggle): void => {
          setInputOpen(toggle);
          setTimeout(() => {
            setItemListWidth(getSearchWrapperWidth());
          }, INPUT_EXPAND_ANIMATION_DURATION);
        }}
        toggleTrigger={toggleTrigger}
        alwaysHighlight
      />
    );
  }, [
    change,
    clearTooltip,
    clearValue,
    value,
    focusTrigger,
    toggleTrigger,
    label,
    onKeyDown,
    placeholder,
    getSearchWrapperWidth,
  ]);
  const renderRecentItems = React.useCallback(() => {
    return (
      recent &&
      recentDisplayProps &&
      !label &&
      hasSomeElement(filteredRecent) && (
        <>
          {!!recentDisplayProps.title && (
            <SearchHeader headerText={recentDisplayProps.title} tooltip={recentDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredRecent}
            width={itemsListWidth}
            visibleRows={recentDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={recentDisplayProps.rowHeight}
            highlight={value}
            onItemClick={selectResult as (e: FilterElement | MenuItemProps) => void}
            itemRender={recentDisplayProps.itemRender as (item: FilterElement | MenuItemProps) => React.ReactElement}
            listProps={{ autoHeight: true }}
          />
        </>
      )
    );
  }, [filteredRecent, label, recent, itemsListWidth, selectResult, value, recentDisplayProps]);
  const renderParameters = React.useCallback(() => {
    return (
      parameters &&
      parametersDisplayProps &&
      !label &&
      hasSomeElement(filteredParameters) && (
        <>
          {!!parametersDisplayProps.title && (
            <SearchHeader headerText={parametersDisplayProps.title} tooltip={parametersDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredParameters}
            width={itemsListWidth}
            visibleRows={parametersDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={parametersDisplayProps.rowHeight}
            highlight={value}
            onItemClick={
              ((item: FilterElement): void => selectFilter(item)) as (e: MenuItemProps | FilterElement) => void
            }
            itemRender={
              parametersDisplayProps.itemRender as (item: FilterElement | MenuItemProps) => React.ReactElement
            }
            listProps={{ autoHeight: true }}
          />
        </>
      )
    );
  }, [filteredParameters, parameters, label, value, itemsListWidth, selectFilter, parametersDisplayProps]);
  const renderSuggestions = React.useCallback(() => {
    return (
      suggestions &&
      suggestionsDisplayProps &&
      parameterValue &&
      !resultChoosed &&
      hasSomeElement(filteredSuggestions) && (
        <>
          {!!suggestionsDisplayProps.title && (
            <SearchHeader headerText={suggestionsDisplayProps.title} tooltip={suggestionsDisplayProps.tooltip} />
          )}
          <SearchItemList
            data={filteredSuggestions}
            width={itemsListWidth}
            visibleRows={suggestionsDisplayProps.visibleRows || DEFAULT_VISIBLE_ROWS}
            rowHeight={suggestionsDisplayProps.rowHeight}
            highlight={value}
            onItemClick={selectResult as (e: FilterElement | MenuItemProps) => void}
            itemRender={
              suggestionsDisplayProps.itemRender as (item: FilterElement | MenuItemProps) => React.ReactElement
            }
          />
        </>
      )
    );
  }, [
    suggestions,
    filteredSuggestions,
    itemsListWidth,
    parameterValue,
    resultChoosed,
    selectResult,
    value,
    suggestionsDisplayProps,
  ]);
  return (
    <S.SearchWrapper
      ref={ref}
      className="SearchWrapper"
      inputOpen={inputOpen}
      width={width}
      onKeyDown={(e): void => {
        focusWithArrowKeys(e, 'ds-search-item', () => {
          focusInputComponent(!focusTrigger);
        });
      }}
      {...rest}
    >
      {renderInputWrapper()}
      {listVisible && (
        <S.ListWrapper
          onClick={(): void => {
            focusInputComponent(!focusTrigger);
          }}
        >
          <S.List
            maxHeight={dropdownMaxHeight}
            className={inputOpen && !resultChoosed && listVisible && isListItemRendered() ? 'search-list-open' : ''}
          >
            <Scrollbar absolute maxHeight={dropdownMaxHeight && Number(dropdownMaxHeight - SCROLLBAR_HEIGHT_OFFSET)}>
              {renderRecentItems()}
              {!!filteredParameters?.length && !!filteredRecent?.length && !label && divider}
              {renderParameters()}
              {renderSuggestions()}
            </Scrollbar>
          </S.List>
        </S.ListWrapper>
      )}
    </S.SearchWrapper>
  );
};
export default Search;
