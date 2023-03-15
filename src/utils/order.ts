import { CartType, OrderTypeProducts } from "../types";

type DeliveryPriceType = Record<"Доставка по России — 350₽" | "Курьером по Москве — 300₽" | "Самовывоз (пр-т Андропова, 18 корп. 3)", number | null>;

const deliveryPrice = {
  "Доставка по России — 350₽": 350,
  "Курьером по Москве — 300₽": 300,
  "Самовывоз (пр-т Андропова, 18 корп. 3)": null,
}

export const priceFormatter = (price: number) => {
  return Intl.NumberFormat("ru-RU").format(price).toLocaleString();
};

export const getDeliveryPrice = (value: string) => {
  const result = deliveryPrice[value as keyof DeliveryPriceType];
  return result !== undefined ? result : null;
};

export const prepareItemsToSend = (items: CartType[]) => {
  return items.map((value: CartType, index: number) => ({
    ...value,
    id: index,
  })) as OrderTypeProducts[];
};
