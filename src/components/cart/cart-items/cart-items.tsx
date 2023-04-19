import React from 'react';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { MaskedInput } from '@alfalab/core-components/masked-input';
import { LoadableImage } from 'components/ui-components/loadable-image';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi';
import { RxCrossCircled } from 'react-icons/rx';
import { IconButton } from '@alfalab/core-components/icon-button';
import { useCart } from 'hooks/use-cart';
import { OptionItems } from './types';

import styles from './cart-items.module.css';

const mask = { input: [/^[1-9]/, /[0-9]*$/] };

export const CartItems: React.FC = React.memo(() => {
  const {
    cartItemsLength,
    cartItems,
    onClickIncrement,
    onClickDecrement,
    onClickRemove,
    handleChangeCount,
  } = useCart();

  const renderOption = (name: OptionItems, option: string | null) => {
    return option ? (
      <Typography.Text tag='p' weight='regular' view='secondary-large'>
        {name}: {option}
      </Typography.Text>
    ) : null;
  };

  const renderCartItems = () => {
    return cartItemsLength ? (
      cartItems.map(
        ({
          id,
          preview,
          title,
          totalCount,
          totalPrice,
          color,
          size,
          stickerName,
        }) => (
          <Space
            direction='horizontal'
            key={id}
            align='center'
            className={styles.cart__items__item}
          >
            <Space direction='horizontal' align='center'>
              <LoadableImage src={preview} alt='test' />
              <Space className={styles.item__description} size={0}>
                <Typography.Text tag='p' weight='bold' view='primary-large'>
                  {title}
                </Typography.Text>
                {renderOption(OptionItems.Color, color)}
                {renderOption(OptionItems.Size, size)}
                {renderOption(OptionItems.stickerName, stickerName)}
              </Space>
            </Space>

            <Space
              className={styles.item__counter}
              fullWidth
              size={0}
              direction='horizontal'
              align='center'
            >
              <Space
                direction='horizontal'
                align='center'
                className={styles.item__counter__buttons}
                size={5}
                fullWidth
              >
                <IconButton
                  className={styles.item__counter__buttons_button}
                  icon={HiOutlineMinusCircle}
                  size='s'
                  disabled={totalCount === 1}
                  onClick={() => onClickDecrement(id)}
                  data-testid='decrement-count'
                />

                <MaskedInput
                  value={totalCount.toString()}
                  defaultValue={totalCount.toString()}
                  onChange={(e) => handleChangeCount(e, id)}
                  placeholder={totalCount.toString()}
                  mask={mask.input}
                  className={styles.item__counter__buttons__text_count}
                  data-testid='input-count'
                />

                <IconButton
                  className={styles.item__counter__buttons_button}
                  icon={HiOutlinePlusCircle}
                  size='s'
                  disabled={totalCount === 99}
                  onClick={() => onClickIncrement(id)}
                  data-testid='increment-count'
                />

                <Typography.Text
                  weight='bold'
                  tag='p'
                  className={styles.item__text_price}
                >
                  {totalPrice} ₽
                </Typography.Text>
              </Space>
              <IconButton
                className={styles.item__counter__buttons_cross}
                icon={RxCrossCircled}
                size='s'
                onClick={() => onClickRemove(id)}
                data-testid='delete-item'
              />
            </Space>
          </Space>
        )
      )
    ) : (
      <Typography.Text
        className={styles.cart__items__empty_cart}
        tag='p'
        weight='bold'
        view='primary-large'
      >
        Корзина пуста
      </Typography.Text>
    );
  };

  return <div className={styles.cart__items}>{renderCartItems()}</div>;
});
