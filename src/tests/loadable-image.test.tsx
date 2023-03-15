import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LoadableImage } from "components/ui-components/loadable-image";
import * as image from "./mocks/get-image-200.json";
import * as imageNotFound from "./mocks/get-image-500.json";

const mockedImage = image["image"];
const mockedAlt = image["alt"];
const mockedNotFoundImage = imageNotFound["image"];
const mockedAltNotFoundImage = imageNotFound["alt"];

describe("LoadableImage component", () => {
  it("should render LoadableImage component", () => {
    const { baseElement } = render(
      <LoadableImage src={mockedImage} alt={mockedAlt} />
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("shouldn't render LoadableImage component with non-existent image", async () => {
    render(
      <LoadableImage src={mockedNotFoundImage} alt={mockedAltNotFoundImage} />
    );

    const image = (await screen.findByRole("img")) as HTMLImageElement;

    fireEvent.error(image, {
      target: image,
    });

    await waitFor(() => {
      expect(image.src).toContain("images/image-not-found.jpeg");
    });
  });
});
