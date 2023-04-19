import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Cart } from '../components/cart';
import * as items from './mocks/get-cart-items-200.json';
import * as cartLength from './mocks/get-cart-length-200.json';
import * as totalCount from './mocks/get-total-count-200.json';
import * as totalPrice from './mocks/get-total-price-200.json';

const mockCartItems = items['items'];
const mockedLength = cartLength['length'];
const mockedCount = totalCount['count'];
const mockedPrice = totalPrice['price'];

jest.mock('hooks/use-cart', () => ({
  useCart: () => ({
    cartItems: mockCartItems,
    cartItemsLength: mockedLength,
    totalCount: mockedCount,
    totalPrice: mockedPrice,
  }),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Cart component', () => {
  it('should render Cart component', async () => {
    const { baseElement } = render(<Cart />, { wrapper: MemoryRouter });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Cart component with 1 count', async () => {
    render(<Cart />, { wrapper: MemoryRouter });

    const result = await screen.findByText('1');
    expect(result).toBeInTheDocument();
  });

  it('should render Cart component with click on icon and get item', async () => {
    render(<Cart />, { wrapper: MemoryRouter });

    fireEvent.click(await screen.findByTestId('cart-icon'));
    expect(await screen.findByText('Ваш заказ')).toBeInTheDocument();
  });

  it("shouldn't render Cart component with non-existent count", async () => {
    render(<Cart />, { wrapper: MemoryRouter });

    const result = screen.queryByText(
      'non-existent description'
    ) as HTMLImageElement;
    expect(result).not.toBeTruthy();
  });
});
