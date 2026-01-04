import type { ReactElement } from 'react';

import styles from './FloatingCard.module.scss';

export type FloatingCardProps = {
  title: string;
  items: [string, string, string, string];
  imgSrc: string;
};

export const FloatingCard = (props: FloatingCardProps): ReactElement => {
  const { title, items, imgSrc } = props;

  return (
    <div className={styles['floating-card-container']}>
      <img src={imgSrc} alt={`${title} icon`} />
      <h5>{title}</h5>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
};
