export type ProductsType = {
  id: number;
  preview: string;
  images: string[];
  title: string;
  description: string;
  price: number;
  availability: boolean;
  subtitle?: string;
  colors?: string[];
  sizes?: string[];
  stickerNumbers?: number[];
};

export type MadeInAlfaInitialStateType = {
  products: ProductsType[];
  isLoading: boolean;
  hasError: boolean;
};

export type GroupsType = {
  id: number;
  title: string;
  description: string;
  products: ProductsType[];
};

export type YourDesignInitialStateType = {
  groups: GroupsType[];
  isLoading: boolean;
  hasError: boolean;
};

export type ProductsTypeInititalState = {
  items: ProductsType;
  isLoading: boolean;
  hasError: boolean;
};
