import { render, screen } from "@testing-library/react";
import { App } from "./components";

test("renders learn react link", () => {
  // eslint-disable-next-line react/jsx-filename-extension
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
