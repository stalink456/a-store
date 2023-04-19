import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartPanel } from 'components/cart/cart-panel/cart-panel';
import * as getTotalPrice from './mocks/get-total-price-200.json';

const mockedTotalPrice = getTotalPrice['price'];

jest.mock('hooks/use-cart', () => ({
  useCart: () => ({
    totalPrice: mockedTotalPrice,
  }),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const handleOpenMenu = jest.fn();

describe('CartPanel component', () => {
  it('should render CartPanel component', async () => {
    const { baseElement } = render(
      <CartPanel open={true} handleOpenMenu={handleOpenMenu} />,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render CartPanel component with correct price', async () => {
    render(<CartPanel open={true} handleOpenMenu={handleOpenMenu} />, {
      wrapper: MemoryRouter,
    });

    const result = await screen.findByText('Корзина пуста');
    expect(result).toBeInTheDocument();
  });

  it("shouldn't render CartPanel component with non-existent text", async () => {
    render(<CartPanel open={true} handleOpenMenu={handleOpenMenu} />, {
      wrapper: MemoryRouter,
    });

    const result = screen.queryByText('non-existent text') as HTMLImageElement;
    expect(result).not.toBeTruthy();
  });
});
