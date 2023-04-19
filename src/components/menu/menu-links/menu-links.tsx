import React from 'react';
import { List } from '@alfalab/core-components/list';
import { Space } from '@alfalab/core-components/space';
import { TitleLink } from 'components/ui-components/title-link';

import styles from './menu-links.module.css';

export const MenuLinks: React.FC = React.memo(() => {
  return (
    <React.Fragment>
      <Space className={styles.menu__links} direction='horizontal'>
        <List tag='ul' marker=' '>
          <TitleLink
            tag='h2'
            weight='bold'
            text='Сделано в Альфе'
            route='/made-in-alfa'
          />
          <TitleLink
            tag='h2'
            weight='bold'
            text='Свой дизайн'
            route='/your-design'
          />
          <TitleLink tag='h2' weight='bold' text='Контакты' route='/contacts' />
        </List>
      </Space>
    </React.Fragment>
  );
});
