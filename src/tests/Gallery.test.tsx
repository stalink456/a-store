import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Gallery } from 'components/ui-components/gallery';
import * as images from './mocks/get-images-200.json';

const mockedImages = images['images'];
const firstImage = mockedImages[0];
const secondImage = mockedImages[1];

describe('Gallery component', () => {
  it('should render Gallery component with images', () => {
    const { baseElement } = render(<Gallery images={mockedImages} />, {
      wrapper: MemoryRouter,
    });

    expect(baseElement).toMatchSnapshot();
  });

  it('should render Gallery component with two images', async () => {
    render(<Gallery images={[firstImage]} />, { wrapper: MemoryRouter });

    expect(await screen.findAllByRole('img')).toHaveLength(2);
  });

  it('should render Gallery component with switching images', async () => {
    render(<Gallery images={mockedImages} />, { wrapper: MemoryRouter });

    expect(await screen.findAllByAltText(firstImage))[0] as HTMLImageElement;

    fireEvent.click(screen.getByAltText(secondImage));

    expect(await screen.findAllByAltText(secondImage))[0] as HTMLImageElement;
  });

  it("shouldn't render Gallery component with non-existent image", async () => {
    render(<Gallery images={mockedImages} />, { wrapper: MemoryRouter });

    const image = screen.queryByAltText(
      'non-existent image'
    ) as HTMLImageElement;
    await waitFor(() => expect(image === null).toBeTruthy());
  });

  it("shouldn't render Gallery component with non-existent description", async () => {
    render(<Gallery images={mockedImages} />, { wrapper: MemoryRouter });

    const result = screen.queryByAltText(
      'non-existent description'
    ) as HTMLImageElement;
    await waitFor(() => expect(result).not.toBeTruthy());
  });
});
