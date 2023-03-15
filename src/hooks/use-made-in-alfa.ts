import React from "react";
import { useAppDispatch, useAppSelector } from "store";
import {
  madeInAlfaActions,
  madeInAlfaIsLoadingSelector,
  madeInAlfaProductsSelector,
} from "store/made-in-alfa";

export const useMadeInAlfa = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(madeInAlfaProductsSelector);
  const isLoading = useAppSelector(madeInAlfaIsLoadingSelector);

  const fetchProducts = React.useCallback(() => {
    dispatch(madeInAlfaActions.request());
  }, [dispatch]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    isLoading,
  };
};
