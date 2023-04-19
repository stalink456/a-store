import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TextBoldMedium } from 'components/ui-components/text-bold-medium';

describe('TextBoldMedium component', () => {
  it('should render TextBoldMedium component', () => {
    const { baseElement } = render(<TextBoldMedium text='A-Store' />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render TextBoldMedium component with title', async () => {
    render(<TextBoldMedium text='A-Store' />);

    expect(await screen.findByText('A-Store')).toBeInTheDocument();
  });

  it("shouldn't render TextBoldMedium component with non-existent text", async () => {
    render(<TextBoldMedium text='A-Store' />);

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
