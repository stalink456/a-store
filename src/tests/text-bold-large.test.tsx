import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextBoldLarge } from 'components/ui-components/text-bold-large';

describe('TextBoldLarge component', () => {
  it('should render TextBoldLarge component', () => {
    const { baseElement } = render(<TextBoldLarge text='A-Store' />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render TextBoldLarge component with title', async () => {
    render(<TextBoldLarge text='A-Store' />);

    expect(await screen.findByText('A-Store')).toBeInTheDocument();
  });

  it("shouldn't render TextBoldLarge component with non-existent text", async () => {
    render(<TextBoldLarge text='A-Store' />);

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
