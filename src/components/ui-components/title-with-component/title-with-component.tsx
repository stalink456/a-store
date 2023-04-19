import React from 'react';
import { Typography } from '@alfalab/core-components/typography';
import { TitleWithComponentType } from './types';

import styles from './title-with-component.module.css';

export const TitleWithComponent: React.FC<TitleWithComponentType> = React.memo(
  ({ title, children }) => {
    return (
      <div className={styles.title_with_component}>
        <Typography.Title tag='h6' weight='bold' view='small'>
          {title}
        </Typography.Title>
        {children}
      </div>
    );
  }
);
