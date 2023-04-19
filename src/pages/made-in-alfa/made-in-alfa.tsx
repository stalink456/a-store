import React from 'react';
import { Page } from 'components/ui-components/page';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { ProductsCard } from 'components/products-card';
import { Loading } from 'components/ui-components/loading';
import { useMadeInAlfa } from 'hooks/use-made-in-alfa';

import styles from './made-in-alfa.module.css';

export const MadeInAlfa: React.FC = () => {
  const { products, isLoading } = useMadeInAlfa();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Page>
      <div className={styles.made_in}>
        <Space
          className={styles.made_in__container}
          direction='vertical'
          fullWidth
          size={5}
        >
          <Space direction='horizontal' size={5} fullWidth>
            <Typography.Title
              className={styles.made_in__title}
              tag='h1'
              view='xlarge'
              weight='bold'
            >
              Сделано в Альфе
            </Typography.Title>
          </Space>
          <Space direction='horizontal'>
            <Typography.Title
              className={styles.made_in__subtitle}
              tag='h6'
              view='small'
              weight='medium'
            >
              Хотим каждую из этих вещей! Себе, родным и друзьям
            </Typography.Title>
          </Space>
          <Space
            className={styles.made_in__products}
            direction='horizontal'
            wrap
            size={0}
          >
            {products.map((value, id) => (
              <ProductsCard {...value} key={id} />
            ))}
          </Space>
        </Space>
      </div>
    </Page>
  );
};
