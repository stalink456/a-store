import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from 'components/header';

describe('Header component', () => {
  it('should render Header component', () => {
    const { baseElement } = render(<Header />, { wrapper: MemoryRouter });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Header component with title', () => {
    render(<Header />, { wrapper: MemoryRouter });

    const result = screen.getAllByText('A-Store')[0] as HTMLElement;
    expect(result).toBeInTheDocument();
  });

  it('should render Header component with menu', async () => {
    render(<Header />, { wrapper: MemoryRouter });

    const result = await screen.findByText('меню');
    expect(result).toBeInTheDocument();
  });

  it("shouldn't render Header component with non-existent text", () => {
    render(<Header />, { wrapper: MemoryRouter });

    const result = screen.queryByText('non-existent text');
    expect(result).not.toBeInTheDocument();
  });
});
