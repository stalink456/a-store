import { ApplicationState } from '..';

export const yourDesignSelector = (state: ApplicationState) => state.yourDesign;

export const yourDesignGroupsSelector = (state: ApplicationState) =>
  yourDesignSelector(state).groups;
export const yourDesignIsLoadingSelector = (state: ApplicationState) =>
  yourDesignSelector(state).isLoading;
export const yourDesignIsErrorSelector = (state: ApplicationState) =>
  yourDesignSelector(state).hasError;
