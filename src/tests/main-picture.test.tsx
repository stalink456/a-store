import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainPicture } from 'components/ui-components/main-picture';
import MadeInAlfa from 'pages/made-in-alfa';
import * as products from './mocks/get-products-200.json';
import * as loading from './mocks/get-loading-false.json';
import * as image from './mocks/get-image-200.json';

const mockProducts = products['products'];
const mockIsLoading = loading['loading'];
const mockedImage = image['image'];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('hooks/use-made-in-alfa', () => ({
  useMadeInAlfa: () => ({
    products: mockProducts,
    isLoading: mockIsLoading,
  }),
}));

describe('MainPicture component', () => {
  it('should render MainPicture component', () => {
    const { baseElement } = render(
      <MainPicture
        src={mockedImage}
        text='Сделано в Альфе'
        route={'/made-in-alfa'}
      />,
      { wrapper: MemoryRouter }
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render MainPicture component with title', async () => {
    render(
      <MainPicture
        src={mockedImage}
        text='Сделано в Альфе'
        route={'/made-in-alfa'}
      />,
      { wrapper: MemoryRouter }
    );

    const result = await screen.findByText('Сделано в Альфе');

    expect(result).toBeInTheDocument();
  });

  it('should render MainPicture component with transition to MadeInAlfaPage', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path='/'
            element={
              <MainPicture
                src={mockedImage}
                text='Сделано в Альфе'
                route={'/made-in-alfa'}
              />
            }
          />
          <Route path='/made-in-alfa' element={<MadeInAlfa />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText('Сделано в Альфе'));

    expect(
      await screen.findByText('Футболка с бархатными стикерами')
    ).toBeInTheDocument();
  });

  it("shouldn't render MainPicture component with non-existent image", async () => {
    render(
      <MainPicture
        src={mockedImage}
        text='Сделано в Альфе'
        route={'/made-in-alfa'}
      />,
      { wrapper: MemoryRouter }
    );

    const image = screen.queryByAltText(
      'non-existent image'
    ) as HTMLImageElement;
    await waitFor(() => expect(image === null).toBeTruthy());
  });

  it("shouldn't render MainPicture component with non-existent description", async () => {
    render(
      <MainPicture
        src={mockedImage}
        text='Сделано в Альфе'
        route={'/made-in-alfa'}
      />,
      { wrapper: MemoryRouter }
    );

    const result = screen.queryByAltText(
      'non-existent description'
    ) as HTMLImageElement;
    await waitFor(() => expect(result).not.toBeTruthy());
  });
});
