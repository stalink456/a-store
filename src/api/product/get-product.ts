import HttpClient from 'utils/httpClient';
import { Method } from 'api/types';
import { ProductsType } from 'store/types';
import { BASE_URL } from '../../constants';

export const getProduct = async (id: number): Promise<ProductsType> => {
  const response = await HttpClient.call(
    Method.Get,
    `${BASE_URL}/product/${id}`
  );
  return response.data;
};
