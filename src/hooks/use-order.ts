import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'store';
import {
  cartItemsLengthSelector,
  cartItemsSelector,
  cartTotalPriceSelector,
} from 'store/cart';
import {
  orderActions,
  orderDeliverySelector,
  orderIsShowingSelector,
  orderItemsSelector,
  orderLoadingSelector,
} from 'store/order';
import { getDeliveryPrice, prepareItemsToSend } from 'utils/order';
import { FormValues } from 'types';
import { DeliveryType } from 'store/order/types';
import { schema } from '../constants';

export const useOrder = () => {
  const dispatch = useAppDispatch();
  const isShowing = useAppSelector(orderIsShowingSelector);
  const cartItemsLength = useAppSelector(cartItemsLengthSelector);
  const cartItems = useAppSelector(cartItemsSelector);
  const price = useAppSelector(cartTotalPriceSelector);
  const isLoading = useAppSelector(orderLoadingSelector);
  const order = useAppSelector(orderItemsSelector);
  const delivery = useAppSelector(orderDeliverySelector);
  const deliveryPrice = getDeliveryPrice(delivery);

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues | HTMLFormElement>({
    defaultValues: order,
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    const subscription = watch(({ deliveryType }) =>
      dispatch(orderActions.addDelivery(deliveryType as DeliveryType))
    );
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  React.useEffect(() => {
    if (!cartItemsLength) {
      dispatch(orderActions.openOrder(false));
    }
  }, [cartItemsLength, dispatch]);

  const handleOnCLose = React.useCallback(() => {
    dispatch(orderActions.openOrder(false));
  }, [dispatch]);

  const handleOnSubmitForm = (data: FormValues) => {
    dispatch(
      orderActions.request({
        ...data,
        products: prepareItemsToSend(cartItems),
      })
    );
  };

  return {
    isShowing,
    cartItemsLength,
    order,
    price,
    delivery,
    deliveryPrice,
    isLoading,
    reset,
    errors,
    control,

    handleSubmit,
    handleOnCLose,
    handleOnSubmitForm,
  };
};
