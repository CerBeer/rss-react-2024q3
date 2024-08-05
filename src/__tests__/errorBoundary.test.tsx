import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Component } from "react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";

interface State {
  error: boolean;
}

interface ErrorProps {
  title?: string;
}

class ErrorButton extends Component<ErrorProps, State> {
  static defaultProps = {
    title: "Throw Error",
  };

  constructor(props: ErrorProps) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ error: true });
  };

  render() {
    const { title } = this.props;
    const { error } = this.state;
    if (error) {
      throw new Error("Something went wrong...");
    }

    return (
      <button
        type="button"
        className="button-throw-error"
        onClick={this.handleClick}
      >
        {title}
      </button>
    );
  }
}

describe("ErrorBoundary", () => {
  it("renders when no error", () => {
    render(
      <ErrorBoundary>
        <div>No error</div>
      </ErrorBoundary>,
    );

    expect(screen.queryByText("No error")).toBeInTheDocument();
  });

  it("renders error message", async () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => null);

    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>,
    );

    let buttonThrow = screen.getByRole("button", { name: /Throw Error/i });
    expect(buttonThrow).toBeInTheDocument();

    await userEvent.setup().click(buttonThrow);
    const buttonFix = screen.getByRole("button", { name: /Fix this error/i });
    expect(buttonFix).toBeInTheDocument();

    await userEvent.setup().click(buttonFix);
    buttonThrow = screen.getByRole("button", { name: /Throw Error/i });
    expect(buttonThrow).toBeInTheDocument();

    spy.mockRestore();
  });
});
