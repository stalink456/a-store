import React from "react";
import {
  BaseSelectChangePayload,
  OptionShape,
} from "@alfalab/core-components/select";
import { OptionsTypes } from "components/description-with-from/types";
import { useAppDispatch } from "store";
import { cartActions } from "store/cart";
import { defineParam } from "utils/products";

type useProductFormType = {
  id: number;
  title: string;
  preview: string;
  price: number;
};

export const useProductForm = ({
  id,
  preview,
  title,
  price,
}: useProductFormType) => {
  const [selected, setSelected] = React.useState<OptionsTypes>(null);
  const dispatch = useAppDispatch();

  const handleChangeSelect = React.useCallback(
    (payload: BaseSelectChangePayload) => {
      setSelected(
        (prev) =>
          ({
            ...prev,
            [payload?.name as string]: payload.selected,
          } as OptionsTypes)
      );
    },
    []
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      cartActions.addItem({
        id: id.toString(),
        title,
        preview,
        price,
        color: defineParam(selected?.colors as OptionShape),
        size: defineParam(selected?.sizes as OptionShape),
        stickerName: defineParam(selected?.stickerNumbers as OptionShape),
        totalCount: 1,
        totalPrice: price,
      })
    );
  };

  return {
    selected,
    handleChangeSelect,
    handleSubmit,
  };
};
