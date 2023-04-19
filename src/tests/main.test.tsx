import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Main } from 'pages/main';

describe('Main component', () => {
  it('should render Main component', () => {
    const { baseElement } = render(<Main />, { wrapper: MemoryRouter });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Main component with text', async () => {
    render(<Main />, { wrapper: MemoryRouter });

    await screen.findByText('Свой дизайн');
  });

  it("shouldn't render Main component with non-existent text", async () => {
    render(<Main />, { wrapper: MemoryRouter });

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
