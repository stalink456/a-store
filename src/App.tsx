import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from 'components/footer';
import { Header } from 'components/header';
import { Routing } from 'components/routing';
import { Cart } from 'components/cart';
import { Order } from 'components/order';
import { Notifications } from 'components/notifications';
import { ErrorBoundary } from 'components/error-boundary';

import style from './app.module.css';

export const App = () => (
  <div className={style.app}>
    <Router>
      <ErrorBoundary>
        <Header />
        <Cart />
        <Order />
        <Notifications />
        <div className={style.app__content}>
          <Routing />
        </div>
        <Footer />
      </ErrorBoundary>
    </Router>
  </div>
);
