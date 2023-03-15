import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Store } from "@reduxjs/toolkit";
import { YourDesign } from "pages/your-design/your-design";
import Product from "pages/product";
import { wrapperProvider } from "utils/wrapper-provider";
import { createTestStore } from "utils/test-store";
import * as product from "./mocks/get-product-200.json";
import * as groups from "./mocks/get-your-design-groups-200.json";

const mockGroups = groups["groups"];
const mockProduct = product["product"];

axios.get = jest.fn();
const mockedAxios = axios as jest.Mocked<typeof axios>;

let store: Store;

describe("YourDesign component", () => {
  beforeEach(() => {
    store = createTestStore;
  });

  it("should render YourDesign component", async () => {
    mockedAxios.get.mockResolvedValue({ mockGroups });

    const { baseElement } = render(wrapperProvider(store, <YourDesign />), {
      wrapper: MemoryRouter,
    });

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    expect(baseElement).toMatchSnapshot();
  });

  it("should render YourDesign component with title", async () => {
    mockedAxios.get.mockResolvedValue({ mockGroups });
    render(wrapperProvider(store, <YourDesign />), { wrapper: MemoryRouter });

    const result = await screen.findByText("Свой дизайн");
    expect(result).toBeInTheDocument();
  });

  it("should render YourDesign component with a transition to Product page", async () => {
    mockedAxios.get.mockResolvedValue({ mockGroups });

    render(
      wrapperProvider(
        store,
        <MemoryRouter initialEntries={["/your-design"]}>
          <Routes>
            <Route path="/your-design" element={<YourDesign />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByAltText("Футболка с бархатными стикерами"));
    mockedAxios.get.mockResolvedValue({ mockProduct });

    expect(
      await screen.findByText("Футболка с бархатными стикерами")
    ).toBeInTheDocument();
  });

  it("should render YourDesign component with infinity Spinner", async () => {
    mockedAxios.get.mockResolvedValue([]);

    render(wrapperProvider(store, <YourDesign />), { wrapper: MemoryRouter });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("shouldn't render YourDesign component with non-existent image", async () => {
    mockedAxios.get.mockResolvedValue({ mockGroups });

    render(wrapperProvider(store, <YourDesign />), { wrapper: MemoryRouter });

    const image = screen.queryByAltText(
      "non-existent image"
    ) as HTMLImageElement;
    await waitFor(() => expect(image === null).toBeTruthy());
  });

  it("shouldn't render YourDesign component with non-existent description", async () => {
    mockedAxios.get.mockResolvedValue({ mockGroups });

    render(wrapperProvider(store, <YourDesign />), { wrapper: MemoryRouter });

    const result = screen.queryByAltText(
      "non-existent description"
    ) as HTMLImageElement;
    await waitFor(() => expect(result).not.toBeTruthy());
  });
});
