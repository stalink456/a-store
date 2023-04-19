import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Product from 'pages/product';
import { GroupsCard } from 'components/groups-card';
import { GroupsType } from 'store/types';
import * as loading from './mocks/get-loading-false.json';
import * as product from './mocks/get-product-200.json';
import * as groups from './mocks/get-groups-200.json';

const mockedLoading = loading['loading'];
const mockProduct = product['product'];
const mockedGroups = groups['groups'] as GroupsType[];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('hooks/use-product', () => ({
  useProduct: () => ({
    product: mockProduct,
    isLoading: mockedLoading,
  }),
}));

describe('GroupsCard component', () => {
  it('should render GroupsCard component', async () => {
    const { baseElement } = render(<GroupsCard items={mockedGroups} />, {
      wrapper: MemoryRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render GroupsCard component with title', async () => {
    render(<GroupsCard items={mockedGroups} />, {
      wrapper: MemoryRouter,
    });

    const result = await screen.findByText('Бархатные стикеры');
    expect(result).toBeInTheDocument();
  });

  it('should render GroupsCard component with a transition to Product page', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<GroupsCard items={mockedGroups} />} />
          <Route path='/product/:id' element={<Product />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('Футболка с бархатными стикерами'));

    fireEvent.click(
      screen.getByAltText(
        'http://qa-games.ru/astore/public/images/23597101.png'
      )
    );

    expect(
      await screen.findByText('Футболка с бархатными стикерами')
    ).toBeInTheDocument();
  });

  it("shouldn't render YourDesign component with non-existent image", async () => {
    render(<GroupsCard items={mockedGroups} />, {
      wrapper: MemoryRouter,
    });

    const image = screen.queryByAltText(
      'non-existent image'
    ) as HTMLImageElement;
    await waitFor(() => expect(image === null).toBeTruthy());
  });

  it("shouldn't render YourDesign component with non-existent description", async () => {
    render(<GroupsCard items={mockedGroups} />, {
      wrapper: MemoryRouter,
    });

    const result = screen.queryByAltText(
      'non-existent description'
    ) as HTMLImageElement;
    await waitFor(() => expect(result).not.toBeTruthy());
  });
});
