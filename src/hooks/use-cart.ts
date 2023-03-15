import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import {
  cartActions,
  cartItemsLengthSelector,
  cartItemsSelector,
  cartTotalPriceSelector,
} from "store/cart";
import { calculateTotalCount } from "utils/cart";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(cartItemsSelector);
  const cartItemsLength = useAppSelector(cartItemsLengthSelector);
  const cartTotalPrice = useAppSelector(cartTotalPriceSelector);
  const cartRef = React.useRef<HTMLDivElement>(null);

  const totalCount = calculateTotalCount(cartItems);

  const onClickIncrement = (id: string) => {
    dispatch(cartActions.incrementItem(id));
  };

  const onClickDecrement = (id: string) => {
    dispatch(cartActions.decrementItem(id));
  };

  const onClickRemove = (id: string) => {
    if (
      window.confirm("Вы действительно хотите удалить данный товар из корзины?")
    ) {
      dispatch(cartActions.removeItem(id));
    }
  };

  const handleChangeCount = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = Number(e.target.value);

    if (value) {
      dispatch(cartActions.setCount({ value, id }));
    }
  };

  React.useEffect(() => {
    const json = JSON.stringify(cartItems);
    localStorage.setItem("cart", json);
  }, [cartItems]);

  return {
    cartItems,
    cartItemsLength,
    cartTotalPrice,
    cartRef,
    totalCount,

    onClickIncrement,
    onClickDecrement,
    onClickRemove,
    handleChangeCount,
  };
};
