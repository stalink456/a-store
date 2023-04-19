import React from 'react';
import { Space } from '@alfalab/core-components/space';
import { LoadableImage } from 'components/ui-components/loadable-image';
import { GalleryType } from './types';
import { useGallery } from 'hooks/use-gallery';

import styles from './gallery.module.css';

export const Gallery: React.FC<GalleryType> = ({ images }) => {
  const { sliderImage, handleOnClick } = useGallery(images);

  return (
    <div className={styles.gallery}>
      <Space direction='vertical' fullWidth>
        <LoadableImage key={sliderImage} src={sliderImage} alt={sliderImage} />
        <Space direction='horizontal' size={5} wrap>
          {images.map((value, id) => (
            <div
              className={value === sliderImage ? styles.gallery_container : ''}
              key={id}
              onClick={() => handleOnClick(value)}
            >
              <Space
                direction='horizontal'
                className={styles.gallery__small_pictures}
              >
                <LoadableImage src={value} alt={value} />
              </Space>
            </div>
          ))}
        </Space>
      </Space>
    </div>
  );
};
