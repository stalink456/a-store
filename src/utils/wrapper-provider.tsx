import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

export const wrapperProvider = (store: Store, component: React.ReactNode) => {
  return <Provider store={store}>{component}</Provider>;
};
