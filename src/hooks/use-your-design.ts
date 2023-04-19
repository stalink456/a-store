import React from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import {
  yourDesignActions,
  yourDesignGroupsSelector,
  yourDesignIsLoadingSelector,
} from 'store/your-design';

export const useYourDesign = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(yourDesignGroupsSelector);
  const isLoading = useAppSelector(yourDesignIsLoadingSelector);

  const fetchGroups = React.useCallback(() => {
    dispatch(yourDesignActions.request());
  }, [dispatch]);

  React.useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return {
    groups,
    isLoading,
  };
};
