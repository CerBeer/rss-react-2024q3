import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("demo", () => {
  expect(true).toBe(true);
});

test("get App markdown", () => {
  render(<App />);
  screen.debug();
});
