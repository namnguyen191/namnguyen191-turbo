import type { ReactElement } from 'react';

import styles from './LoadingSpinner.module.scss';

export type LoadingSpinnerProps = {
  scale?: string;
};

export const LoadingSpinner = (props: LoadingSpinnerProps): ReactElement => {
  const { scale = '1' } = props;

  return (
    <div className={styles['lds-ring']} style={{ scale }}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
