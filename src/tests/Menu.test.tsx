import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Menu } from "components/menu";
import MadeInAlfa from "pages/made-in-alfa";
import * as menu from "./mocks/get-menu-200.json";
import * as products from "./mocks/get-products-200.json";
import * as loading from "./mocks/get-loading-false.json";

const mockedOpen = menu["open"];
const mockedProducts = products["products"];
let mockIsLoading = loading["loading"];

const handleOpenMenu = jest.fn();

jest.mock("hooks/use-made-in-alfa", () => ({
  useMadeInAlfa: () => ({
    products: mockedProducts,
    isLoading: mockIsLoading,
  }),
}));

describe("Menu component", () => {
  it("should render Menu component", () => {
    const { baseElement } = render(
      <Menu open={mockedOpen} handleOpenMenu={handleOpenMenu} />,
      {
        wrapper: MemoryRouter,
      }
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render Menu component with a transition to MadeInAlfa page", async () => {
    let open = false;

    render(
      <MemoryRouter>
        <Menu open={open} handleOpenMenu={() => !open} />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/made-in-alfa" element={<MadeInAlfa />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText("Сделано в Альфе"));

    expect(
      screen.getByText("Хотим каждую из этих вещей! Себе, родным и друзьям")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Футболка с бархатными стикерами")
    ).toBeInTheDocument();
  });

  it("should render Menu component with title", async () => {
    render(<Menu open={mockedOpen} handleOpenMenu={handleOpenMenu} />, {
      wrapper: MemoryRouter,
    });

    const result = await screen.findByText("A-Store");
    expect(result).toBeInTheDocument();
  });

  it("shouldn't render Menu component with non-existent text", () => {
    render(<Menu open={mockedOpen} handleOpenMenu={handleOpenMenu} />, {
      wrapper: MemoryRouter,
    });

    const result = screen.queryByText("non-existent text");
    expect(result).not.toBeInTheDocument();
  });
});
