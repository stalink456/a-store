import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Store } from "@reduxjs/toolkit";
import { MadeInAlfa } from "pages/made-in-alfa/made-in-alfa";
import Product from "pages/product";
import { createTestStore } from "../utils/test-store";
import * as madeinalfa from "./mocks/get-made-in-alfa-products-200.json";
import * as product from "./mocks/get-made-in-alfa-product-200.json";
import { wrapperProvider } from "utils/wrapper-provider";

const mockProducts = madeinalfa["madeinalfa"];
const mockProduct = product["product"];

axios.get = jest.fn();
const mockedAxios = axios as jest.Mocked<typeof axios>;

let store: Store;

describe("MadeInAlfa component", () => {
  beforeEach(() => {
    store = createTestStore;
  });

  it("should render MadeInAlfa component", async () => {
    mockedAxios.get.mockResolvedValue({ mockProducts });
    const { baseElement } = render(wrapperProvider(store, <MadeInAlfa />), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(baseElement).toMatchSnapshot();
  });

  it("should render MadeInAlfa component with title", async () => {
    render(wrapperProvider(store, <MadeInAlfa />), { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    await screen.findByText("Сделано в Альфе");
  });

  it("should render MadeInAlfa component with a transition to Product page", async () => {
    mockedAxios.get.mockResolvedValue({ mockProducts });

    render(
      wrapperProvider(
        store,
        <MemoryRouter initialEntries={["/made-in-alfa"]}>
          <Routes>
            <Route path="/made-in-alfa" element={<MadeInAlfa />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText("Рюкзак «Для умных и свободных»"));

    mockedAxios.get.mockResolvedValue({ mockProduct });

    expect(
      await screen.findByText("Рюкзак «Для умных и свободных»")
    ).toBeInTheDocument();
  });

  it("should render MadeInAlfa component with infinity Spinner", async () => {
    mockedAxios.get.mockResolvedValue([]);

    render(wrapperProvider(store, <MadeInAlfa />), { wrapper: MemoryRouter });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("shouldn't render MadeInAlfa component with non-existent image", async () => {
    render(wrapperProvider(store, <MadeInAlfa />), { wrapper: MemoryRouter });

    const image = screen.queryByAltText(
      "non-existent image"
    ) as HTMLImageElement;
    await waitFor(() => expect(image === null).toBeTruthy());
  });

  it("shouldn't render MadeInAlfa component with non-existent description", async () => {
    render(wrapperProvider(store, <MadeInAlfa />), { wrapper: MemoryRouter });

    const result = screen.queryByAltText(
      "non-existent description"
    ) as HTMLImageElement;
    await waitFor(() => expect(result).not.toBeTruthy());
  });
});
