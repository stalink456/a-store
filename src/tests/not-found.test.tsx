import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from 'pages/not-found';
import { Main } from 'pages/main';

describe('NotFound component', () => {
  it('should render NotFound component', () => {
    const { baseElement } = render(<NotFound />, { wrapper: MemoryRouter });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render NotFound component with title', async () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    await screen.findByText('Извините, что-то пошло не так');
  });

  it('should render NotFound component with a transition to Main page', async () => {
    render(
      <MemoryRouter initialEntries={['/not-found']}>
        <Routes>
          <Route path='/not-found' element={<NotFound />} />
          <Route path='/' element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText('Главная страница'));

    expect(await screen.findByText('Свой дизайн')).toBeInTheDocument();
  });

  it("shouldn't render NotFound component with non-existent text", async () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
