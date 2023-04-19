import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { madeInAlfaReducer } from './made-in-alfa';
import { yourDesignReducer } from './your-design';
import { productReducer } from './product';
import { cartReducer } from './cart';
import { orderReducer } from './order';
import { notificationsReducer } from './notifications';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    madeInAlfa: madeInAlfaReducer,
    yourDesign: yourDesignReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    notifications: notificationsReducer,
  },
  devTools: true,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);

export type ApplicationState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
  useSelector;
