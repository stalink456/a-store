export type CartType = {
  id: string;
  title: string;
  preview: string;
  price: number;
  size: string | null;
  color: string | null;
  stickerName: string | null;
  totalCount: number;
  totalPrice: number;
};

export type SidePanelType = {
  open: boolean;
  handleOpenMenu: () => void;
};

export type DeliveryType =
  | "Доставка по России — 350₽"
  | "Курьером по Москве — 300₽"
  | "Самовывоз (пр-т Андропова, 18 корп. 3)";

type PaymentType = "Банковская карта" | "Промокод";

export type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  deliveryType: DeliveryType | null;
  promocode: string;
  isAgree: boolean;
  comment: string;
  paymentType: PaymentType | null;
};

export type OrderTypeProducts = {
  id: number;
  title: string;
  preview: string;
  price: number;
  size: string | null;
  color: string | null;
  stickerName: number | null;
  totalCount: number;
  totalPrice: number;
};

export type OrderType = FormValues & {
  products: OrderTypeProducts[];
};

export type TextType = {
  text: string;
};
