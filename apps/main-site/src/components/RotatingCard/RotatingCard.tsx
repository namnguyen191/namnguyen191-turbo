import { type ReactElement } from 'react';

import styles from './RotatingCard.module.scss';

export type RotatingCardProps = {
  width?: string;
  height?: string;
  children?: ReactElement[];
};

export const RotatingCard = (props: RotatingCardProps): ReactElement => {
  const { width = '20rem', height = '28.125rem', children } = props;

  if (!children) {
    return <span>No card children provided!</span>;
  }

  return (
    <div style={{ width, height }} className={styles['rotating-card-container']}>
      <div className={`${styles['card__side']} ${styles['card__side--front']}`}>
        {children.find((child) => child.key === 'front')}
      </div>
      <div className={`${styles['card__side']} ${styles['card__side--back']}`}>
        {children.find((child) => child.key === 'back')}
      </div>
    </div>
  );
};
