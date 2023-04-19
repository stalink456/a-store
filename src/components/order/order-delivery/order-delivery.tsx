import { Typography } from '@alfalab/core-components/typography';
import { useOrder } from 'hooks/use-order';
import React from 'react';
import { priceFormatter } from 'utils/order';

import styles from './order-delivery.module.css';

export const OrderDelivery = () => {
  const { price, delivery, deliveryPrice } = useOrder();

  const renderDelivery = () => {
    return deliveryPrice ? (
      <React.Fragment>
        <Typography.Text tag='p' view='primary-large' weight='medium'>
          Сумма: {priceFormatter(price)} ₽
        </Typography.Text>
        <Typography.Text tag='p' view='primary-large' weight='medium'>
          Доставка: {delivery}: {deliveryPrice} ₽
        </Typography.Text>
        <Typography.Text tag='p' view='primary-large' weight='bold'>
          Итоговая сумма: {priceFormatter(price + deliveryPrice)} ₽
        </Typography.Text>
      </React.Fragment>
    ) : null;
  };

  return (
    <div className={styles.order__delivery} key={deliveryPrice}>
      <Typography.Text tag='p' view='primary-large' weight='bold'>
        Сумма: {priceFormatter(price)} ₽
      </Typography.Text>
      {renderDelivery()}
    </div>
  );
};
