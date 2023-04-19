import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contacts from 'pages/contacts';
import { Header } from 'components/header';

describe('Contacts component', () => {
  it('should render Contacts component', () => {
    const { baseElement } = render(<Contacts />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Contacts component with title', async () => {
    render(<Contacts />);

    const result = await screen.findByText('Контакты');

    expect(result).toBeInTheDocument();
  });

  it('should render Header component with transition to Contacts page', async () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='/contacts' element={<Contacts />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText('меню'));
    fireEvent.click(await screen.findByText('Контакты'));

    const result = await screen.findByText('info@alfabankstore.ru');

    expect(result).toBeInTheDocument();
  });

  it('should render Contacts component with non-existent description', async () => {
    render(<Contacts />);

    const result = screen.queryByText('non-existent text') as HTMLImageElement;
    expect(result).toBeFalsy();
  });
});
