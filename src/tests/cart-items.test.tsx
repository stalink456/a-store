import { MemoryRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { CartItems } from "components/cart/cart-items";
import { store } from "store";
import { cartActions } from "store/cart";
import * as cart from "./mocks/get-cart-item-200.json";
import * as confirm from "./mocks/confirm-window-200.json";

const mockedCart = cart["cart"];
const mockedConfirm = confirm["confirm"];

describe("CartItems component", () => {
  beforeAll(() => store.dispatch(cartActions.addItem(mockedCart)));

  it("should render CartItems component", async () => {
    const { baseElement } = render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render CartItems component with name of product", async () => {
    render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const result = await screen.findByText("Рюкзак «Для умных и свободных»");
    expect(result).toBeInTheDocument();
  });

  it("should render CartItems component with increment count", async () => {
    render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByTestId("decrement-count")).toBeDisabled();

    expect(screen.getByTestId("input-count")).toHaveValue("1");

    fireEvent.click(screen.getByTestId("increment-count"));
    expect(screen.queryByTestId("input-count")).toHaveValue("2");
    expect(screen.getByTestId("decrement-count")).not.toBeDisabled();
  });

  it("should render CartItems component with decriment count", async () => {
    render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByTestId("decrement-count")).not.toBeDisabled();

    fireEvent.click(screen.getByTestId("decrement-count"));

    expect(screen.getByTestId("decrement-count")).toBeDisabled();
  });

  it("should render CartItems component with delete item", async () => {
    window.confirm = jest.fn().mockImplementation(() => mockedConfirm);

    render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    expect(screen.getByTestId("input-count")).toHaveValue("1");

    fireEvent.click(screen.getByTestId("delete-item"));

    expect(screen.getByText("Корзина пуста")).toBeInTheDocument();
  });

  it("shouldn't render CartItems component with non-existent text", async () => {
    render(
      <Provider store={store}>
        <CartItems />
      </Provider>,
      { wrapper: MemoryRouter }
    );

    const result = screen.queryByText("non-existent text") as HTMLImageElement;
    expect(result).not.toBeTruthy();
  });
});
