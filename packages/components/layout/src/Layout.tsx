import * as React from 'react';
import * as S from './Layout.styles';

interface Style<T> {
  left?: T;
  leftInner?: T;
  main?: T;
  mainInner?: T;
  right?: T;
  rightInner?: T;
}

export type LayoutProps = {
  header?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  styles?: Style<object>;
};

const Layout: React.FC<LayoutProps> = props => {
  const { header, left, right, children, className, styles } = props;
  return (
    <S.LayoutContainer className={className}>
      {header ? <S.LayoutHeader>{header}</S.LayoutHeader> : null}
      <S.LayoutBody>
        <>
          {left ? (
            <S.LayoutSidebar style={styles && styles.left}>
              <S.LayoutSidebarInner style={styles && styles.leftInner}>{left}</S.LayoutSidebarInner>
            </S.LayoutSidebar>
          ) : null}
        </>
        <S.LayoutMain data-popup-container style={styles && styles.main}>
          <S.LayoutMainInner style={styles && styles.mainInner}>{children}</S.LayoutMainInner>
        </S.LayoutMain>
        <>
          {right ? (
            <S.LayoutSidebar style={styles && styles.right}>
              <S.LayoutSidebarInner style={styles && styles.rightInner}>{right}</S.LayoutSidebarInner>
            </S.LayoutSidebar>
          ) : null}
        </>
      </S.LayoutBody>
    </S.LayoutContainer>
  );
};

export default Layout;
