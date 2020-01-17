import * as React from 'react';

import Modal, { ModalProps } from 'antd/lib/modal';
import Icon from '@synerise/ds-icon';
import CloseM from '@synerise/ds-icon/dist/icons/CloseM';

import Button from '@synerise/ds-button';
import '@synerise/ds-core/dist/js/style';

import './style/index.less';
import * as S from './Modal.styles';

interface Props extends ModalProps {
  description?: string;
  headerActions?: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'extra_large';
  bodyBackground?: 'white' | 'grey';
  texts?: {
    okButton?: string;
    cancelButton?: string;
  };
  onClose?: () => void;
}

const mapSizeToWidth = {
  small: 520,
  medium: 792,
  large: 1044,
  extraLarge: 1280,
};

class ModalProxy extends React.Component<Props> {
  static defaultProps = {
    closable: true,
    bodyBackground: 'white',
    texts: {
      okButton: 'Apply',
      cancelButton: 'Cancel',
    },
  };

  static info = Modal.info;
  static success = Modal.success;
  static error = Modal.error;
  static warning = Modal.warning;
  static confirm = Modal.confirm;

  render(): React.ReactNode {
    const {
      texts,
      bodyBackground,
      closable,
      headerActions,
      title,
      description,
      size,
      onClose,
      ...antModalProps
    } = this.props;
    // TODO onClose shouldn't work as afterClose - it will trigger passed afterClose function twice,
    // TODO Need check if any Modal in app uses it and fix this behaviour
    const handleOnClose = onClose || ((): void => antModalProps.afterClose && antModalProps.afterClose());
    const className = `bodybg-${bodyBackground} ${antModalProps.className || ''}`;

    const titleContainer = (
      <>
        {title && (
          <S.TitleContainer>
            <S.Title level={3}>{title}</S.Title>
            <S.ActionButtons>
              {headerActions}
              {closable && (
                <Button data-testid="modal-close" className="close-modal" type="ghost" onClick={handleOnClose}>
                  <Icon component={<CloseM />} />
                </Button>
              )}
            </S.ActionButtons>
          </S.TitleContainer>
        )}

        {description && <S.Description>{description}</S.Description>}
      </>
    );

    const footerContainer = antModalProps.footer || (
      <S.FooterContainer>
        {/* eslint-disable-next-line */}
        <Button type="ghost" onClick={antModalProps.onCancel} {...antModalProps.cancelButtonProps}>
          {texts && texts.cancelButton}
        </Button>

        {/* eslint-disable-next-line */}
        <Button type={antModalProps.okType || 'primary'} onClick={antModalProps.onOk} {...antModalProps.okButtonProps}>
          {texts && texts.okButton}
        </Button>
      </S.FooterContainer>
    );

    return (
      <Modal
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...antModalProps}
        className={className}
        width={!size ? undefined : mapSizeToWidth[size]}
        closable={false}
        title={(title || description) && titleContainer}
        footer={antModalProps.footer !== null ? footerContainer : null}
      />
    );
  }
}

export default ModalProxy;
