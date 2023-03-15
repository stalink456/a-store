import { render } from "@testing-library/react";
import { Loading } from "components/ui-components/loading";

describe("Loading component", () => {
  it("should render Loading component", () => {
    const { baseElement } = render(<Loading />);

    expect(baseElement).toMatchSnapshot();
  });
});
