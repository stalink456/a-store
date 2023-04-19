import React from 'react';

export const useGallery = (images: string[]) => {
  const [sliderImage, setSliderImage] = React.useState<string>(images[0]);

  const handleOnClick = (value: string) => {
    const index = images.indexOf(value);

    setSliderImage(images[index]);
  };

  return {
    sliderImage,
    handleOnClick,
  };
};
