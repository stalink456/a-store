import React from "react";
import { IconButton } from "@alfalab/core-components/icon-button";
import { AiOutlineShopping } from "react-icons/ai";
import { Typography } from "@alfalab/core-components/typography";
import { Space } from "@alfalab/core-components/space";
import { useSidePanel } from "hooks/use-side-panel";
import { CartPanel } from "./cart-panel/cart-panel";
import { useCart } from "hooks/use-cart";

import styles from "./cart.module.css";

export const Cart: React.FC = React.memo(() => {
  const { cartItemsLength, totalCount, cartTotalPrice, cartRef } = useCart();
  const { open, handleOpenMenu } = useSidePanel(cartRef);

  const renderCart = () => {
    return cartItemsLength ? (
      <div key={totalCount} className={styles.cart__wrapper}>
        <IconButton
          className={styles.cart__icon}
          icon={AiOutlineShopping}
          size="s"
          onClick={handleOpenMenu}
          data-testid="cart-icon"
        />
        <Typography.Text className={styles.cart__icon_text} tag="p">
          {totalCount}
        </Typography.Text>
        <Space className={styles.cart__icon_tooltip}>
          <Typography.Text
            className={styles.cart__icon_tooltip__text}
            tag="p"
            weight="bold"
            view="primary-large"
          >
            = {cartTotalPrice} ₽
          </Typography.Text>
        </Space>
      </div>
    ) : null;
  };

  return (
    <div className={styles.cart}>
      {renderCart()}
      <CartPanel ref={cartRef} open={open} handleOpenMenu={handleOpenMenu} />
    </div>
  );
});
