import React from 'react';
import { Button } from '@alfalab/core-components/button';
import { OptionShape } from '@alfalab/core-components/select';
import { TitleWithSelect } from 'components/ui-components/title-with-select';
import { useProductForm } from 'hooks/use-product-form';
import {
  modifyOption,
  isDefineOptionValue,
  isDisabledButton,
} from 'utils/products';
import { ProductFormType } from './type';

import styles from './product-form.module.css';

export const ProductForm: React.FC<ProductFormType> = ({
  id,
  title,
  preview,
  price,
  colors,
  sizes,
  stickerNumbers,
}) => {
  const { selected, handleChangeSelect, handleSubmit } = useProductForm({
    id,
    title,
    preview,
    price,
  });

  const renderColors = () =>
    colors ? (
      <TitleWithSelect
        text='цвет'
        name='colors'
        options={modifyOption(colors)}
        selected={isDefineOptionValue(selected?.colors as OptionShape)}
        handleChangeSelect={handleChangeSelect}
      />
    ) : null;

  const renderSizes = () =>
    sizes ? (
      <TitleWithSelect
        text='размер'
        name='sizes'
        options={modifyOption(sizes)}
        selected={isDefineOptionValue(selected?.sizes as OptionShape)}
        handleChangeSelect={handleChangeSelect}
      />
    ) : null;

  const renderStickerNumbers = () =>
    stickerNumbers ? (
      <TitleWithSelect
        text='номер стикера'
        name='stickerNumbers'
        options={modifyOption(stickerNumbers)}
        selected={isDefineOptionValue(selected?.stickerNumbers as OptionShape)}
        handleChangeSelect={handleChangeSelect}
      />
    ) : null;

  return (
    <React.Fragment>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {renderColors()}
        {renderSizes()}
        {renderStickerNumbers()}

        <Button
          type='submit'
          view='primary'
          disabled={isDisabledButton(selected, colors, sizes, stickerNumbers)}
          block
          data-testid='basket'
        >
          В корзину
        </Button>
      </form>
    </React.Fragment>
  );
};
