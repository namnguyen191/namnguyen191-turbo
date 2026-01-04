import type { ReactElement } from 'react';

import styles from './BubbleDisplay.module.scss';

export type BubbleDisplayProps = {
  imgUr: string;
  title: string;
  description: string;
  url: string;
};

export const BubbleDisplay = (props: BubbleDisplayProps): ReactElement => {
  const { imgUr, title, description, url } = props;

  return (
    <div className={styles['bubble-display-container']}>
      <img src={imgUr} alt={`${title} image`} />
      <div className={styles['text-container']}>
        <a href={url} target="_blank" rel="noreferrer">
          <span className={styles['title']}>{title}</span>
        </a>
        <span className={styles['description']}>{description}</span>
      </div>
    </div>
  );
};
