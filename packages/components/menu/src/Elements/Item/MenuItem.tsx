import * as React from 'react';
import '@synerise/ds-core/dist/js/style';

import { ItemType, MenuItemProps } from './MenuItem.types';
import SubMenuItem from '../SubMenu/SubMenu';
import { SubMenuProps } from '../SubMenu/SubMenu.types';
import Text from './Text/Text';
import Select from './Select/Select';
import Danger from './Danger/Danger';
import { MenuDivider } from '../../Menu.styles';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NOOP = (): void => {};
const MenuItem: React.FC<SubMenuProps & MenuItemProps> = props => {
  const {
    prefixel,
    suffixel,
    ordered,
    disabled,
    danger,
    text,
    description,
    subMenu,
    children,
    type,
    indentLevel,
    timeToHideTooltip,
    onItemHover,
    onClick,
    menuItemKey,
    onTitleClick,
    ...rest
  } = props;
  if (subMenu) {
    return (
      <SubMenuItem
        prefixel={prefixel}
        suffixel={suffixel}
        ordered={ordered}
        disabled={disabled}
        danger={danger}
        text={text}
        description={description}
        indentLevel={indentLevel || 0}
        subMenu={subMenu}
        onItemHover={onItemHover || NOOP}
        onClick={(menuInfo): void => {
          menuInfo.domEvent.stopPropagation();
          onClick && onClick(menuInfo);
        }}
        menuItemKey={menuItemKey}
        onTitleClick={onTitleClick}
        {...rest}
      />
    );
  }
  switch (type) {
    case ItemType.SELECT:
      return (
        <Select
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          description={description}
          indentLevel={indentLevel || 0}
          onItemHover={onItemHover || NOOP}
          onClick={(menuInfo): void => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Select>
      );
    case ItemType.DANGER:
      return (
        <Danger
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          description={description}
          indentLevel={indentLevel || 0}
          onItemHover={onItemHover || NOOP}
          onClick={(menuInfo): void => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Danger>
      );
    case ItemType.DIVIDER:
      return <MenuDivider level={rest.level} />;
    default:
      return (
        <Text
          ordered={ordered}
          prefixel={prefixel}
          suffixel={suffixel}
          disabled={disabled}
          danger={danger}
          description={description}
          timeToHideTooltip={timeToHideTooltip}
          indentLevel={indentLevel || 0}
          onItemHover={onItemHover || NOOP}
          onClick={(menuInfo): void => {
            menuInfo.domEvent.stopPropagation();
            onClick && onClick(menuInfo);
          }}
          {...rest}
        >
          {text || children}
        </Text>
      );
  }
};

export default MenuItem;
