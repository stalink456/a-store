import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProductsCard } from 'components/products-card';
import Product from 'pages/product';
import * as product from './mocks/get-product-200.json';
import * as cardItem from './mocks/get-card-item-200.json';
import * as loading from './mocks/get-loading-false.json';

const mockedProduct = product['product'];
const mockedCard = cardItem['card'];
const mockIsLoading = loading['loading'];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('hooks/use-product', () => ({
  useProduct: () => ({
    product: mockedProduct,
    isLoading: mockIsLoading,
  }),
}));

describe('ProductsCard component', () => {
  it('should render ProductsCard component', () => {
    const { baseElement } = render(<ProductsCard {...mockedCard} />, {
      wrapper: MemoryRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Menu component with a transition to ProductsCard page', async () => {
    render(
      <MemoryRouter>
        <ProductsCard {...mockedCard} />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('Блокнот Для умных и свободных'));
  });

  it('should render ProductsCard component with image', async () => {
    render(<ProductsCard {...mockedCard} />, { wrapper: MemoryRouter });

    const image = (await screen.findByAltText(
      'Блокнот Для умных и свободных'
    )) as HTMLImageElement;
    await waitFor(() => expect(image.src !== '').toBeTruthy());
  });

  it('should render ProductsCard component with description', async () => {
    render(<ProductsCard {...mockedCard} />, { wrapper: MemoryRouter });

    const result = await screen.findByText('Блокнот Для умных и свободных');
    expect(result).toBeTruthy();
  });

  it("shouldn't render ProductsCard component with non-existent price", () => {
    render(<ProductsCard {...mockedCard} />, { wrapper: MemoryRouter });
    const price = screen.getByTestId(`price-${mockedCard.id}`).textContent;

    expect(price).not.toBe('1999 ₽');
  });
});
