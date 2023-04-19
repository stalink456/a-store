import HttpClient from 'utils/httpClient';
import { Method } from 'api/types';
import { BASE_URL } from '../../constants';
import { OrderType } from 'types';

export const postOrder = async (body: OrderType) => {
  const response = await HttpClient.call<OrderType>(
    Method.Post,
    `${BASE_URL}/create-order`,
    body
  );
  return response.data;
};
