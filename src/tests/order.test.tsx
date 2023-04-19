import React from 'react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Order } from '../components/order';
import { cartActions } from '../store/cart';
import { orderActions } from '../store/order';
import { Store } from '@reduxjs/toolkit';
import { createTestStore } from '../utils/test-store';
import * as cart from './mocks/get-cart-item-200.json';
import * as postorder from './mocks/post-order-200.json';
import { wrapperProvider } from '../utils/wrapper-provider';

const mockedCart = cart['cart'];
const mockedPostOrder = postorder['postorder'];

axios.get = jest.fn();
const mockedAxios = axios as jest.Mocked<typeof axios>;

let store: Store;

describe('Order component', () => {
  beforeAll(() => {
    store = createTestStore;
    store.dispatch(cartActions.addItem(mockedCart));
    store.dispatch(orderActions.openOrder(true));
    store.dispatch(orderActions.request(mockedPostOrder));
  });

  it('should render Order component', () => {
    mockedAxios.get.mockResolvedValue({ mockedCart });
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    const { baseElement } = render(wrapperProvider(store, <Order />), {
      wrapper: MemoryRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Order component with header', async () => {
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    render(wrapperProvider(store, <Order />), { wrapper: MemoryRouter });

    await screen.findByText('Ваш заказ');
  });

  it('should render Order component with input text', async () => {
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    render(wrapperProvider(store, <Order />), { wrapper: MemoryRouter });

    const input = screen.getByPlaceholderText('example@site.ru');

    fireEvent.input(input, {
      target: { value: 'example@site.com' },
    });

    expect(screen.getByPlaceholderText('example@site.ru')).toHaveValue(
      'example@site.com'
    );
  });

  it('should render Order component with change radio value', async () => {
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    render(wrapperProvider(store, <Order />), { wrapper: MemoryRouter });

    const checkboxFirst = screen.getByRole('radio', {
      name: 'Доставка по России — 350₽',
    });

    expect(checkboxFirst).not.toBeChecked();
    fireEvent.click(checkboxFirst);
    expect(checkboxFirst).toBeChecked();
  });

  it('should render Order component with success responce', async () => {
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    render(wrapperProvider(store, <Order />), { wrapper: MemoryRouter });

    fireEvent.change(screen.getByTestId('input-with-name'), {
      target: { value: 'Станислав' },
    });

    fireEvent.change(screen.getByTestId('input-with-email'), {
      target: { value: 'example@site.ru' },
    });

    fireEvent.change(screen.getByTestId('input-with-phone'), {
      target: { value: '+7 000 000 00 00' },
    });

    fireEvent.change(screen.getByTestId('input-with-address'), {
      target: { value: '115280, Москва, 1-й Автозаводский проезд, 27к3, 54' },
    });

    fireEvent.click(screen.getByTestId('isAgree'));
    fireEvent.click(screen.getByText('Банковская карта'));
    fireEvent.click(screen.getByText('Дальше'));

    expect(
      screen.queryByText('Введите ваше полное ФИО')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Введите Ваш e-mail')).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        'Введите Ваш номер телефона, например, +7 000 000 00 00'
      )
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Соглашайтесь, будьте любезны')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Выберите способ оплаты')
    ).not.toBeInTheDocument();
  });

  it("shouldn't render Main component with non-existent text", async () => {
    mockedAxios.get.mockResolvedValue({ mockedPostOrder });

    render(wrapperProvider(store, <Order />), { wrapper: MemoryRouter });

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
