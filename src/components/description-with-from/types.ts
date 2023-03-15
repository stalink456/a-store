import { OptionShape } from "@alfalab/core-components/select";

export type OptionsTypes = Record<
  "colors" | "sizes" | "stickerNumbers",
  OptionShape
> | null;

export type DescriptionType = {
  id: number;
  preview: string;
  title: string;
  price: number;
  description: string;
  colors?: string[];
  sizes?: string[];
  stickerNumbers?: number[];
  availability?: boolean;
};
