import React from 'react';
import { Skeleton } from '@alfalab/core-components/skeleton';
import { LoadableImageType } from './types';

import styles from './loadable-image.module.css';

export const LoadableImage: React.FC<LoadableImageType> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const onImageLoaded = () => setIsLoaded(true);

  const onImageError = (e: React.ChangeEvent<HTMLImageElement>) => {
    e.target.src = 'images/image-not-found.jpeg';
  };

  return (
    <React.Fragment>
      <Skeleton visible={!isLoaded} animate={true}>
        <img
          className={`${isLoaded ? styles.loaded : ''}`}
          src={src}
          alt={alt}
          onLoad={onImageLoaded}
          onError={onImageError}
        />
      </Skeleton>
    </React.Fragment>
  );
};
