import { OptionShape } from "@alfalab/core-components/select";
import { OptionsTypes } from "components/description-with-from/types";

type RuWordsType = Record<"white" | "black" | "red" | "green" | "gray", string>;

const ruWords: RuWordsType = {
  white: "белый",
  black: "черный",
  red: "красный",
  green: "зеленый",
  gray: "серый",
};

export const translateFromEnToRu = (str: string) => {
  const result = ruWords[str as keyof RuWordsType];
  return result !== undefined ? result : str;
};

export const isDefineOptionValue = (value: OptionShape) => {
  return value !== undefined ? value : "";
};

export const isDisabledButton = (
  selected: OptionsTypes,
  colors?: string[],
  sizes?: string[],
  stickerNumbers?: number[]
) => {
  return !(
    (selected !== null &&
      Object.keys(selected).length ===
        [colors, sizes, stickerNumbers].filter((value) => value !== undefined)
          .length) ||
    ![colors, sizes, stickerNumbers].filter((value) => value !== undefined)
      .length
  );
};

export const modifyOption = (options: string[] | number[]) =>
  options.map((value, key) => ({
    key: key.toString(),
    content: translateFromEnToRu(value.toString()),
  }));

export const defineParam = (param: OptionShape) => {
  return param !== undefined ? (param.content as string) : null;
};
