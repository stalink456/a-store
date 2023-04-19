import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DescriptionWithForm } from 'components/description-with-from';
import * as product from './mocks/get-product-200.json';

const mockedProduct = product['product'];

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Description component', () => {
  it('should render Description component', () => {
    const { baseElement } = render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Description component with title', async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    const result = await screen.findByText('Футболка с бархатными стикерами');
    expect(result).toBeInTheDocument();
  });

  it('should render Description component with select color', async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    await waitFor(() =>
      expect(screen.queryByText('red')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Выберите цвет'));
    fireEvent.click(screen.getByText('красный'));

    await waitFor(async () =>
      expect(await screen.findByText('красный')).toBeInTheDocument()
    );
  });

  it('should render Description component with select size', async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    await waitFor(() =>
      expect(screen.queryByText('XS')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Выберите размер'));
    fireEvent.click(screen.getByText('XS'));

    await waitFor(async () =>
      expect(await screen.findByText('XS')).toBeInTheDocument()
    );
  });

  it('should render Description component with select stickerNumber', async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    await waitFor(() =>
      expect(screen.queryByText('1')).not.toBeInTheDocument()
    );

    fireEvent.click(screen.getByText('Выберите номер стикера'));
    fireEvent.click(screen.getByText('1'));

    await waitFor(async () =>
      expect(await screen.findByText('1')).toBeInTheDocument()
    );
  });

  it('should render Description component with enabled button', async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });
    await waitFor(() => expect(screen.getByTestId('basket')).toBeDisabled());

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

  it("shouldn't render Description component with non-existent title", async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    const result = screen.queryByText('non-existent title');
    await waitFor(() => expect(result).not.toBeInTheDocument());
  });

  it("shouldn't render Description component with non-existent option", async () => {
    render(<DescriptionWithForm {...mockedProduct} />, {
      wrapper: MemoryRouter,
    });

    fireEvent.click(screen.queryByText('Выберите цвет') as HTMLElement);

    await waitFor(() =>
      expect(screen.queryByText('orange')).not.toBeInTheDocument()
    );
  });
});
