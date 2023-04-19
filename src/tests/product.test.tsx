import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Product } from 'pages/product/product';
import { ProductsType } from 'store/types';
import * as product from './mocks/get-product-200.json';
import * as loading from './mocks/get-loading-false.json';
import * as images from './mocks/get-images-200.json';

let mockProduct = product['product'] as ProductsType;
const mockIsLoading = loading['loading'];
const mockedImages = images['images'];
const mockedFirstImage = mockedImages[0];
const mockedSecondImage = mockedImages[1];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('hooks/use-product', () => ({
  useProduct: () => ({
    product: mockProduct,
    isLoading: mockIsLoading,
  }),
}));

describe('Product component', () => {
  it('should render Product component', () => {
    const { baseElement } = render(<Product />, { wrapper: MemoryRouter });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Product component with title', async () => {
    render(<Product />, { wrapper: MemoryRouter });

    const result = await screen.findByText('Футболка с бархатными стикерами');

    expect(result).toBeInTheDocument();
  });

  it('should render Product component with switch images', async () => {
    render(<Product />, { wrapper: MemoryRouter });

    const images = (await screen.findAllByRole('img')) as HTMLImageElement[];
    await waitFor(() =>
      expect(images[0].src === mockedFirstImage).toBeTruthy()
    );

    fireEvent.click(await screen.findByAltText(mockedSecondImage));

    const firstImage = (await screen.findAllByRole(
      'img'
    )) as HTMLImageElement[];
    await waitFor(() =>
      expect(firstImage[0].src === mockedSecondImage).toBeTruthy()
    );
  });

  it('should render Product component with disabled/enabled button', async () => {
    render(<Product />, { wrapper: MemoryRouter });

    expect(await screen.findByTestId('basket')).toBeDisabled();

    fireEvent.click(screen.getByText('Выберите цвет'));
    fireEvent.click(screen.getByText('красный'));

    fireEvent.click(screen.getByText('Выберите размер'));
    fireEvent.click(screen.getByText('XS'));

    fireEvent.click(screen.getByText('Выберите номер стикера'));
    fireEvent.click(screen.getByText('1'));

    await waitFor(() =>
      expect(screen.getByTestId('basket')).not.toBeDisabled()
    );
  });

  it('should render Product component with NotFound component', async () => {
    mockProduct = {} as ProductsType;

    render(<Product />, { wrapper: MemoryRouter });

    const result = await screen.findByText('Извините, что-то пошло не так');

    expect(result).toBeInTheDocument();
  });
});
