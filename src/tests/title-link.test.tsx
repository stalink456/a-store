import { MemoryRouter, Route, Routes } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TitleLink } from "components/ui-components/title-link";
import { Main } from "pages/main";

describe("TitleLink component", () => {
  it("should render TitleLink component", () => {
    const { baseElement } = render(
      <TitleLink tag="h1" text="A-Store" route="/" />,
      { wrapper: MemoryRouter }
    );

    expect(baseElement).toMatchSnapshot();
  });

  it("should render TitleLink component with title", async () => {
    render(<TitleLink tag="h1" text="A-Store" route="/" />, {
      wrapper: MemoryRouter,
    });

    expect(await screen.findByText("A-Store")).toBeInTheDocument();
  });

  it("should render TitleLink component with a transition to Main page", async () => {
    const route = "/your-design";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route
            path="/your-design"
            element={<TitleLink tag="h1" text="A-Store" route="/" />}
          />
          <Route path="/" element={<Main />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(await screen.findByText("A-Store"));

    expect(await screen.findByText("Свой дизайн")).toBeInTheDocument();
  });

  it("shouldn't render TitleLink component with non-existent text", async () => {
    render(<TitleLink tag="h1" text="A-Store" route="/" />, {
      wrapper: MemoryRouter,
    });

    expect(screen.queryByText("non-existent text")).not.toBeInTheDocument();
  });
});
