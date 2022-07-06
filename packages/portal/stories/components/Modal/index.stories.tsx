import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, text, select, number } from '@storybook/addon-knobs';
import Modal from '@synerise/ds-modal';
import blank from './blank/blank';
import defaultStory from './defaultStory/defaultStory';
import withHeaders from './withHeaders/withHeaders';
import withFooters from './withFooters/withFooters';
import withStepper from './withStepper';

export const sizes = {
  Auto: null,
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
  'Extra Large': 'extraLarge',
  'Full size': 'fullSize',
};

export const bodyBackgroundColors = {
  White: 'white',
  Grey: 'grey',
};

export const propsWithKnobs = () => ({
  wrapClassName: 'custom-class',
  visible: boolean('Open', true),
  title: text('Title text', 'Modal heading'),
  description: text('Description text', 'Modal description'),
  cancelText: text('Cancel text', 'Cancel'),
  okText: text('OK text', 'Apply'),
  width: number('Width', 600),
  okType: text('OK style type', 'primary'),
  zIndex: number('zIndex', 1),
  closable: boolean('(x) button is visible on top right', true),
  confirmLoading: boolean('Loading visual effect', false),
  ...boolean('Clickable OK, Close buttons', false) ? {
    onClose: action('onClose CLICK'),
    onOk: action('onOk CLICK')
  }: {},
  onCancel: action('onCancel CLICK'),
  settingButton: text('setting button text', 'Settings'),
  showHeaderAction: boolean('Show example of an additional header button', true),
  renderCustomFooter: boolean('Render custom footer', true),
  removeFooter: boolean('Render without footer', false),
  size: select('Size', sizes, null),
  bodyBackground: select('Body background color', bodyBackgroundColors, bodyBackgroundColors.White),
});

const stories = {
  default: defaultStory,
  blank,
  withHeaders,
  withFooters,
  withStepper,
};

export default {
  name: 'Components/Modal',
  stories,
  Component: Modal,
};
