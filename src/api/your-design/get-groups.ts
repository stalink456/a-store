import HttpClient from 'utils/httpClient';
import { Method } from 'api/types';
import { GroupsType } from 'store/types';
import { BASE_URL } from '../../constants';

export const getGroups = async (): Promise<GroupsType[]> => {
  const response = await HttpClient.call(Method.Get, `${BASE_URL}/your-design`);
  return response.data;
};
