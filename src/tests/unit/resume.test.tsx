import { render, screen } from "@testing-library/react";
import Resume from "src/pages/resume/index";

describe("Resume", () => {
  it("renders a heading", () => {
    render(<Resume />);
    expect(screen.getByText("Elan Medoff")).toBeInTheDocument();
  });
});
