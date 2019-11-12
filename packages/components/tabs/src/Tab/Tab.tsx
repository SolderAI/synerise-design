import * as React from 'react';
import Icon from '@synerise/ds-icon';
import * as S from './Tab.styles';

export type TabProps = {
  index: number;
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
  onClick: (index: number) => void;
  forwardedRef: React.RefObject<HTMLButtonElement>;
};

const Tab: React.FC<TabProps> = ({ index, label, icon, isActive, disabled, onClick, forwardedRef }: TabProps) => {
  const [isPressed, setPressed] = React.useState(false);
  const handleClick = (): void => {
    onClick(index);
  };

  const handleMouseDown = (): void => {
    setPressed(true);
  };

  const handleMouseUp = (): void => {
    setPressed(false);
  };

  const isPressedClassName = (): string => {
    return isPressed ? 'pressed' : '';
  };

  const isActiveClassName = (): string => {
    return isActive ? 'active' : '';
  };

  return (
    <S.TabContainer
      className={`${isActiveClassName()} ${isPressedClassName()}`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      onBlur={handleMouseUp}
      disabled={disabled}
      ref={forwardedRef}
      type="button"
      data-testid="tab-container"
    >
      <S.TabContent>
        {icon && <Icon component={icon} size={24} />}
        {label && <S.TabLabel>{label}</S.TabLabel>}
      </S.TabContent>
    </S.TabContainer>
  );
};

export default Tab;
