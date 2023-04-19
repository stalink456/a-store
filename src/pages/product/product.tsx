import React from 'react';
import { Page } from 'components/ui-components/page';
import { Space } from '@alfalab/core-components/space';
import { Gallery } from 'components/ui-components/gallery';
import { DescriptionWithForm } from 'components/description-with-from';
import { Loading } from 'components/ui-components/loading';
import { useProduct } from 'hooks/use-product';
import NotFound from 'pages/not-found';

import styles from './product.module.css';

export const Product: React.FC = () => {
  const { product, isLoading } = useProduct();

  if (isLoading) {
    return <Loading />;
  }

  const renderGallery = () => {
    return product.images ? <Gallery images={product.images} /> : <NotFound />;
  };

  const renderDescription = () => {
    return product.description ? <DescriptionWithForm {...product} /> : null;
  };

  return (
    <Page>
      <div className={styles.product}>
        <Space direction='horizontal' wrap size={0}>
          {renderGallery()}
          {renderDescription()}
        </Space>
      </div>
    </Page>
  );
};
