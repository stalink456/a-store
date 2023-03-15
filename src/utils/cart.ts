import { CartType } from "types";

export const calcTotalPrice = (items: CartType[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.totalCount + sum;
  }, 0);
};

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items: CartType[] = data ? JSON.parse(data) : [];
  const cartTotalPrice = calcTotalPrice(items);

  return {
    items: items,
    cartTotalPrice,
  };
};

export const calculateTotalCount = (items: CartType[]) => {
  return items.reduce((sum: number, { totalCount }) => sum + totalCount, 0);
};

export const generateID = (
  color: string | null,
  size: string | null,
  stickerName: string | null
) => {
  return [color, size, stickerName].filter((value) => value !== null).join("");
};
