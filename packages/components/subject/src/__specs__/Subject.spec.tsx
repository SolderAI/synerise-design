import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import { NotificationsM, VarTypeStringM } from '@synerise/ds-icon';
import { SubjectProps } from '../Subject.types';
import Subject from '../Subject';
import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const SUBJECT_TEXTS = {
  searchPlaceholder: 'Search',
  noResults: 'No results',
};

export const SUBJECT_ITEMS = [...new Array(30)].map((i, index) => ({
  id: index,
  name: `Attribute #${index}`,
  icon: <NotificationsM />,
}));

describe('Subject component', () => {
  const DEFAULT_PROPS: SubjectProps = {
    texts: SUBJECT_TEXTS,
    onSelectItem: () => {},
    onShowPreview: () => {},
    type: 'event',
    placeholder: 'Choose event',
    iconPlaceholder: <NotificationsM />,
    selectedItem: undefined,
    items: SUBJECT_ITEMS,
  };

  const RENDER_SUBJECT = (props?: {}) => <Subject {...DEFAULT_PROPS} {...props} />;

  test('Should render with custom placeholder', () => {
    // ARRANGE
    const PLACEHOLDER = 'Choose parameter';
    const { getByText } = renderWithProvider(RENDER_SUBJECT({ placeholder: PLACEHOLDER }));

    //ASSERT
    expect(getByText(PLACEHOLDER)).toBeTruthy();
  });

  test('Should render without showPreview button', () => {
    // ARRANGE
    const PLACEHOLDER = 'Choose parameter';
    const { container } = renderWithProvider(RENDER_SUBJECT({ placeholder: PLACEHOLDER, onShowPreview: undefined }));
    const buttons = container.querySelectorAll('.ds-button');

    // ASSERT
    expect(buttons.length).toBe(1);
  });

  test('Should render with showPreview button', () => {
    // ARRANGE
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    // ASSERT
    expect(buttons.length).toBe(2);
  });

  test('Should call showPreview callback', () => {
    // ARRANGE
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    // ACT
    fireEvent.click(buttons[1]);

    // ASSERT
    expect(onShowPreview).toBeCalled();
  });

  test('Should call showPreview callback', () => {
    // ARRANGE
    const onShowPreview = jest.fn();
    const { container } = renderWithProvider(RENDER_SUBJECT({ onShowPreview: onShowPreview }));
    const buttons = container.querySelectorAll('.ds-button');

    // ACT
    fireEvent.click(buttons[1]);

    // ASSERT
    expect(onShowPreview).toBeCalled();
  });

  test('Should render with selected item', () => {
    // ARRANGE
    const SELECTED_ITEM_NAME = 'Selected item';
    const { getByText } = renderWithProvider(
      RENDER_SUBJECT({ selectedItem: { name: SELECTED_ITEM_NAME, id: 0, icon: <VarTypeStringM /> } })
    );

    // ASSERT
    expect(getByText(SELECTED_ITEM_NAME)).toBeTruthy();
  });

  test('Should open dropdown with list of items and search', () => {
    // ARRANGE
    const { container, getByText, getByPlaceholderText } = renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    const button = container.querySelector('.ds-button');

    // ACT
    button && fireEvent.click(button);

    // ASSERT
    expect(getByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder)).toBeTruthy();
    expect(getByText(SUBJECT_ITEMS[0].name)).toBeTruthy();
  });

  test('Should open dropdown with list of items and search by query and show "No results"', () => {
    // ARRANGE
    const { container, getByText, getByPlaceholderText } = renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    const button = container.querySelector('.ds-button');

    // ACT
    button && fireEvent.click(button);
    const searchBox = getByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder);
    fireEvent.change(searchBox, { target: { value: 'xxxx' } });

    // ASSERT
    expect(getByText(SUBJECT_TEXTS.noResults)).toBeTruthy();
  });

  test('Should open dropdown with list of items and shows list of searching results', () => {
    // ARRANGE
    const { container, getByPlaceholderText, queryAllByRole } = renderWithProvider(RENDER_SUBJECT(), {
      container: document.body,
    });
    const button = container.querySelector('.ds-button');

    // ACT
    button && fireEvent.click(button);
    const searchBox = getByPlaceholderText(SUBJECT_TEXTS.searchPlaceholder);
    fireEvent.change(searchBox, { target: { value: '#2' } });

    // ASSERT
    expect(queryAllByRole('menuitem').length).toBe(11);
  });

  test('Should open dropdown with list, select item and update trigger button', () => {
    // ARRANGE
    const { container, getByText } = renderWithProvider(RENDER_SUBJECT(), { container: document.body });
    const button = container.querySelector('.ds-button');

    // ACT
    button && fireEvent.click(button);
    fireEvent.click(getByText(SUBJECT_ITEMS[3].name));

    // ASSERT
    expect(container.querySelector('.ant-dropdown-hidden')).toBeTruthy();
    expect(getByText(SUBJECT_ITEMS[3].name)).toBeTruthy();
  });

  test('should call onActivate', () => {
    // ARRANGE
    const handleActivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_SUBJECT({ onActivate: handleActivate }));

    // ACT
    userEvent.click(getByText('Choose event'));

    // ASSERT
    expect(handleActivate).toBeCalled();
  });
  test('should call onDeactivate', () => {
    // ARRANGE
    const handleDeactivate = jest.fn();
    const { getByText } = renderWithProvider(RENDER_SUBJECT({ onDeactivate: handleDeactivate }));

    // ACT
    userEvent.click(getByText('Choose event'));
    userEvent.click(document.body);

    expect(handleDeactivate).toBeCalled();
  });
});
