import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from 'components/footer';

describe('Footer component', () => {
  it('should render Footer component', () => {
    const { baseElement } = render(<Footer />, { wrapper: MemoryRouter });
    expect(baseElement).toMatchSnapshot();
  });

  it("shouldn't render Footer component with non-existent text", () => {
    render(<Footer />, { wrapper: MemoryRouter });

    const result = screen.queryByText('non-existent footer');
    expect(result).not.toBeInTheDocument();
  });
});
