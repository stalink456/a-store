import React from 'react';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Space } from '@alfalab/core-components/space';
import { OrderHeader } from './order-header';
import { OrderForm } from './order-form';
import { CartItems } from 'components/cart/cart-items';
import { OrderDelivery } from './order-delivery';
import { Page } from 'components/ui-components/page';
import { useOrder } from 'hooks/use-order';

import styles from './order.module.css';

export const Order: React.FC = () => {
  const { isShowing, handleOnCLose } = useOrder();

  return (
    <div className={styles.order}>
      <ModalDesktop
        size='fullscreen'
        open={isShowing}
        onClose={handleOnCLose}
        contentClassName={styles.order__modal}
      >
        <OrderHeader />
        <ModalDesktop.Content>
          <Page>
            <Space
              direction='horizontal'
              fullWidth
              className={styles.order__wrapper}
            >
              <Space
                direction='vertical'
                fullWidth
                className={styles.order__wrapper__form}
              >
                <OrderForm />
              </Space>

              <Space
                direction='vertical'
                className={styles.order__wrapper__items}
                fullWidth
              >
                <CartItems />
                <Space
                  className={styles.order__wrapper__total_price}
                  direction='vertical'
                  fullWidth
                  size={0}
                >
                  <OrderDelivery />
                </Space>
              </Space>
            </Space>
          </Page>
        </ModalDesktop.Content>
      </ModalDesktop>
    </div>
  );
};
