import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import dataApi from "./mocks/testData";

describe("Tests mock", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(dataApi),
      })
    );
  });

  test("tests name filter", async () => {
    render(<App />);
    expect(fetch).toHaveBeenCalled();
    const filterInputName = screen.getByTestId("name-filter");
    expect(filterInputName).toBeInTheDocument();
    userEvent.type(filterInputName, "oo");
    expect(filterInputName).toHaveValue("oo");
    const planets = await screen.findAllByTestId("planet-name");
    expect(planets).toHaveLength(2);
  });

  test("tests all the filters", async () => {
    render(<App />);
    const selectColumnFilter = screen.getByTestId("column-filter");
    expect(selectColumnFilter).toBeInTheDocument();
    const selectOperatorFilter = screen.getByTestId("comparison-filter");
    expect(selectOperatorFilter).toBeInTheDocument();
    const numFilter = screen.getByTestId("value-filter");
    expect(numFilter).toBeInTheDocument();

    const btnFilter = screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument();

    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(10);
    }, { timeout: 50000 })

    userEvent.selectOptions(selectColumnFilter, "diameter");
    userEvent.selectOptions(selectOperatorFilter, "maior que");
    userEvent.clear(numFilter)
    userEvent.type(numFilter, '9000')

    userEvent.click(btnFilter);

    await waitFor(() => {
      const planets = screen.getAllByTestId("planet-name");
      expect(planets).toHaveLength(7);
    }, { timeout: 50000 })
  });
  jest.setTimeout('10000')
});