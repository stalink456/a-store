import React, { forwardRef } from 'react';
import { SidePanelResponsive } from '@alfalab/core-components/side-panel';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { IconButton } from '@alfalab/core-components/icon-button';
import { TfiClose } from 'react-icons/tfi';
import { Divider } from '@alfalab/core-components/divider';
import { CartItems } from '../cart-items';
import { SidePanelType } from 'types';
import { useCart } from 'hooks/use-cart';
import { Button } from '@alfalab/core-components/button';
import { orderActions } from 'store/order';
import { useAppDispatch } from 'store';

import styles from './cart-panel.module.css';

export const CartPanel = forwardRef<HTMLDivElement, SidePanelType>(
  ({ open, handleOpenMenu }, ref) => {
    const dispatch = useAppDispatch();
    const { cartTotalPrice, cartItemsLength } = useCart();

    const handleOpenOrder = () => {
      handleOpenMenu();
      dispatch(orderActions.openOrder(true));
    };

    const renderTotalPrice = () => {
      return cartTotalPrice ? (
        <Typography.Text
          className={styles.items__total_price}
          tag='p'
          weight='bold'
          view='primary-large'
        >
          Сумма: {cartTotalPrice} ₽
        </Typography.Text>
      ) : null;
    };

    const renderButton = () => {
      return cartItemsLength ? (
        <Button
          className={styles.cart_panel__button_next}
          block
          view='primary'
          onClick={handleOpenOrder}
        >
          Дальше
        </Button>
      ) : null;
    };

    return (
      <div className={styles.cart_panel}>
        <SidePanelResponsive open={open} className={styles.cart_panel__wrapper}>
          <IconButton
            className={styles.cart_panel_close}
            icon={TfiClose}
            size='s'
          />

          <Space
            direction='vertical'
            ref={ref}
            className={styles.cart_panel__items}
            fullWidth
          >
            <Typography.Title tag='h2' view='medium' weight='bold'>
              Ваш заказ
            </Typography.Title>
            <Divider />
            <CartItems />
            <Divider />
            {renderTotalPrice()}
            {renderButton()}
          </Space>
        </SidePanelResponsive>
      </div>
    );
  }
);
