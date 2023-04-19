import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import {
  productActions,
  productIsLoadingSelector,
  productItemsSelector,
} from 'store/product';

export const useProduct = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(productItemsSelector);
  const isLoading = useAppSelector(productIsLoadingSelector);

  React.useEffect(() => {
    const productId = Number(params.id);
    dispatch(productActions.request(productId));
  }, [dispatch, params.id]);

  return {
    product,
    isLoading,
  };
};
