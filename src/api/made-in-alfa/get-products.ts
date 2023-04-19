import HttpClient from 'utils/httpClient';
import { Method } from 'api/types';
import { ProductsType } from 'store/types';
import { BASE_URL } from '../../constants';

export const getProducts = async (): Promise<ProductsType[]> => {
  const response = await HttpClient.call(
    Method.Get,
    `${BASE_URL}/made-in-alfa`
  );
  return response.data;
};
