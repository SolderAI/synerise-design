import * as React from 'react';
import { MenuProps } from 'antd/lib/menu';
import type { TriggerProps } from 'rc-trigger';
import { TooltipProps } from '@synerise/ds-tooltip/dist/Tooltip.types';
import { VisibilityTrigger } from '../../Menu.types';
import { SubMenuProps } from '../SubMenu/SubMenu.types';

export enum ItemType {
  DEFAULT = 'default',
  SELECT = 'select',
  DANGER = 'danger',
  DIVIDER = 'divider',
}

export enum ItemSize {
  DEFAULT = 'default',
  LARGE = 'large',
}

export type TriggerHandle = React.Component<TriggerProps> & { getPopupDomNode: () => HTMLElement };

export interface MenuItemProps extends Omit<MenuProps, 'dataSource' | 'footer'> {
  key?: React.ReactText;
  text?: string | React.ReactNode;
  parent?: boolean;
  prefixel?: React.ReactNode;
  suffixel?: React.ReactNode;
  disabled?: boolean;
  ordered?: boolean | undefined;
  description?: string | React.ReactNode;
  subMenu?: SubMenuProps[];
  copyable?: boolean;
  copyHint?: string | React.ReactNode;
  copyValue?: string;
  copyTooltip?: string | React.ReactNode;
  timeToHideTooltip?: number;
  highlight?: string;
  suffixVisibilityTrigger?: VisibilityTrigger | string;
  prefixVisibilityTrigger?: VisibilityTrigger | string;
  onItemHover?: (e: MouseEvent) => void;
  children?: React.ReactNode;
  type?: ItemType | string;
  indentLevel?: number;
  menuItemKey?: React.ReactText;
  checked?: boolean;
  size?: 'default' | 'large';
  tooltipProps?: TooltipProps;
  hoverTooltipProps?: TriggerProps & { ref?: React.LegacyRef<TriggerHandle> };
  renderHoverTooltip?: () => JSX.Element;
}
