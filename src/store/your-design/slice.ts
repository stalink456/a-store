import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupsType, YourDesignInitialStateType } from 'store/types';

const initialState: YourDesignInitialStateType = {
  groups: [],
  isLoading: false,
  hasError: false,
};

const NAME = 'your-design';

const request: CaseReducer<YourDesignInitialStateType> = (state) => {
  state.isLoading = true;
  state.hasError = false;
};

const success: CaseReducer<
  YourDesignInitialStateType,
  PayloadAction<GroupsType[]>
> = (state, { payload }) => {
  state.isLoading = false;
  state.hasError = false;
  state.groups = payload;
};

const failure: CaseReducer<YourDesignInitialStateType> = (state) => {
  state.isLoading = false;
  state.hasError = true;
};

export const { actions: yourDesignActions, reducer: yourDesignReducer } =
  createSlice({
    name: NAME,
    initialState: initialState,
    reducers: {
      request,
      success,
      failure,
    },
  });
