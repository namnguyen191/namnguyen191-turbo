import { type PropsWithChildren, type ReactElement } from 'react';

import styles from './ToolTip.module.scss';

export type ToolTipProps = { text: string };

export const ToolTip = (props: PropsWithChildren<ToolTipProps>): ReactElement => {
  const { text, children } = props;

  return (
    <div className={styles['tool-tip-container']}>
      {children}
      <div className={styles['tool-tip-text']}>{text}</div>
    </div>
  );
};
