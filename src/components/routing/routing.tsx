import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "components/ui-components/loading";
import { Main } from "../../pages/main";

const MadeInAlfa = React.lazy(
  () => import(/* webpackChunkName: "MadeInAlfa" */ "../../pages/made-in-alfa")
);

const YourDesign = React.lazy(
  () => import(/* webpackChunkName: "YourDesign" */ "../../pages/your-design")
);

const Product = React.lazy(
  () => import(/* webpackChunkName: "Product" */ "../../pages/product")
);

const Contacts = React.lazy(
  () => import(/* webpackChunkName: "Contacts" */ "../../pages/contacts")
);

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "../../pages/not-found")
);

export const Routing = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/made-in-alfa"
          element={
            <Suspense fallback={<Loading />}>
              <MadeInAlfa />
            </Suspense>
          }
        />
        <Route
          path="/your-design"
          element={
            <Suspense fallback={<Loading />}>
              <YourDesign />
            </Suspense>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path="/contacts"
          element={
            <Suspense fallback={<Loading />}>
              <Contacts />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<Loading />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </React.Fragment>
  );
};
