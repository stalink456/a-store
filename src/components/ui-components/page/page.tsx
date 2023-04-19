import React from 'react';
import { PageType } from './types';

import styles from './page.module.css';

export const Page: React.FC<PageType> = ({ children }) => {
  return <div className={styles.page}>{children}</div>;
};
