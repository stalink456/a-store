import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TitleWithComponent } from 'components/ui-components/title-with-component';
import { MaskedInput } from '@alfalab/core-components/masked-input';

describe('TitleWithComponent component', () => {
  it('should render TitleWithComponent component', () => {
    const { baseElement } = render(
      <TitleWithComponent title='Title'>
        <MaskedInput
          placeholder={'Индекс, город, улица, дом, квартира'}
          block
          data-testid='input-with-address'
        />
      </TitleWithComponent>
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('should render TitleWithComponent component with title', async () => {
    render(
      <TitleWithComponent title='Title'>
        <MaskedInput
          placeholder={'Индекс, город, улица, дом, квартира'}
          block
          data-testid='input-with-address'
        />
      </TitleWithComponent>
    );

    expect(await screen.findByText('Title')).toBeInTheDocument();
  });

  it('should render TitleWithComponent component with input some value', async () => {
    render(
      <TitleWithComponent title='Title'>
        <MaskedInput
          placeholder={'Индекс, город, улица, дом, квартира'}
          block
          data-testid='input-with-address'
        />
      </TitleWithComponent>
    );

    fireEvent.input(screen.getByTestId('input-with-address'), {
      target: { value: 'Some text' },
    });

    expect(screen.getByTestId('input-with-address')).toHaveValue('Some text');
  });

  it("shouldn't render TitleWithComponent component with non-existent text", async () => {
    render(
      <TitleWithComponent title='Title'>
        <MaskedInput
          placeholder={'Индекс, город, улица, дом, квартира'}
          block
          data-testid='input-with-address'
        />
      </TitleWithComponent>
    );

    expect(screen.queryByText('non-existent text')).not.toBeInTheDocument();
  });
});
