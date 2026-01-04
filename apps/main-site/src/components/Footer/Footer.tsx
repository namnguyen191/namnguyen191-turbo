import type { ReactElement } from 'react';

import styles from './Footer.module.scss';

export const Footer = (): ReactElement => {
  return (
    <footer className={styles['footer-container']}>
      &copy; 2024, 2026 by Nam Nguyen. All rights reserved. &nbsp;
      <a href="https://github.com/namnguyen191/namnguyen191-turbo">
        Free to use for learning purposes.
      </a>
    </footer>
  );
};
