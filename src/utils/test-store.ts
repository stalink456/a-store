import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { madeInAlfaReducer } from "store/made-in-alfa";
import { yourDesignReducer } from "store/your-design";
import { productReducer } from "store/product";
import { cartReducer } from "store/cart";
import { orderReducer } from "store/order";
import { rootSaga } from "../store/root-saga";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const createTestStore = configureStore({
  reducer: {
    madeInAlfa: madeInAlfaReducer,
    yourDesign: yourDesignReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  devTools: true,
  middleware: middlewares,
});

sagaMiddleware.run(rootSaga);