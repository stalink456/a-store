export type ProductFormType = {
  id: number;
  title: string;
  preview: string;
  price: number;
  colors?: string[] | undefined;
  sizes?: string[] | undefined;
  stickerNumbers?: number[] | undefined;
};
