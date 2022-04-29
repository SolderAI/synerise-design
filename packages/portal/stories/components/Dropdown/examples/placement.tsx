import * as React from 'react';
import { focusWithArrowKeys, useOnClickOutside } from '@synerise/ds-utils';
import Dropdown from '@synerise/ds-dropdown';
import Menu from '@synerise/ds-menu';
import Button from '@synerise/ds-button';
import { boolean, select } from '@storybook/addon-knobs';
import { renderFooter, typesFooter } from '../index.stories';

const Placement: React.FC = () => {
  const data = [{ text: 'Preview' }];
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const footer = boolean('Set footer', false);
  const navigation = boolean('Set navigation', false);
  const setTypeFooter = select('Set footer type', typesFooter, 'singleButton');
  const ref = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setDropdownVisible(false);
  });
  return (
    <div>
      <Dropdown
        overlayStyle={{ borderRadius: '3px' }}
        visible={dropdownVisible}
        placement={select(
          'Placement',
          ['topLeft', 'topRight', 'topCenter', 'bottomLeft', 'bottomRight', 'bottomCenter'],
          'topLeft'
        )}
        overlay={
          <Dropdown.Wrapper
            style={{ width: '220px' }}
            onKeyDown={e => focusWithArrowKeys(e, 'ds-menu-item', () => {})}
            ref={ref}
          >
            {navigation && <Dropdown.BackAction label="Attributes" onClick={() => alert('BackAction clicked')} />}
            <Menu dataSource={data} asDropdownMenu={true} style={{ width: '100%' }} />
            {footer && renderFooter(setTypeFooter)}
          </Dropdown.Wrapper>
        }
      >
        <Button onClick={() => setDropdownVisible(!dropdownVisible)} type="primary">
          Dropdown
        </Button>
      </Dropdown>
    </div>
  );
};
export default Placement;
