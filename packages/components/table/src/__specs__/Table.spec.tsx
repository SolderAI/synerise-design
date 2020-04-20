import * as React from 'react';
import { renderWithProvider } from '@synerise/ds-utils/dist/testing';
import Table from '../index';

const props = {
  dataSource: [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ],
  columns: [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ],
};

describe('Table', () => {
  it('should render correctly', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Table dataSource={props.dataSource} columns={props.columns} />);

    // ASSERT
    expect(getByText('Name')).toBeTruthy();
  });

  it('should render "no data"', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<Table columns={props.columns} />);

    // ASSERT
    expect(getByText('No Data')).toBeTruthy();
  });

  it('should updates columns when receiving props', () => {
    // ARRANGE
    const columns = [
      {
        title: 'Col1',
        key: 'name',
        dataIndex: 'name',
      },
    ];
    const { rerender, getByText, getAllByText } = renderWithProvider(<Table columns={columns} />);

    // ACT
    rerender(<Table columns={props.columns} dataSource={props.dataSource} />);

    // ASSERT
    expect(getByText('Age')).toBeTruthy();
    expect(getAllByText('10 Downing Street')).toBeTruthy();
  });

  it('should render title and subtitle', () => {
    // ARRANGE
    const TITLE = 'test title';
    const { getByText } = renderWithProvider(<Table columns={props.columns} title={TITLE} />);

    // ASSERT
    expect(getByText(TITLE)).toBeTruthy();
  });

  // it('should call onSearch', () => {
  //   // ARRANGE
  //   const onSearch = jest.fn();
  //   const TITLE = 'test title';
  //   const { container } = renderWithProvider(
  //     <Table columns={props.columns} title={TITLE} onSearch={onSearch} search="test" />
  //   );
  //   const input = container.querySelector('input');
  //
  //   // ACT
  //   input && fireEvent.change(input, { target: { value: '23' } }); // this shoundn't work
  //
  //   // ASSERT
  //   expect(input).toBeTruthy();
  //   expect(onSearch).toBeCalled();
  //   expect(input && input.value).toBe('test');
  // });

});
