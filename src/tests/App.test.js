import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App tests", () => {
  it("tets if filters are shown", () => {
    render(<App />);
    const inputNameFilter = screen.getByTestId("name-filter");
    expect(inputNameFilter).toBeInTheDocument();
    const selectFilterColumn = screen.getByTestId("column-filter");
    expect(selectFilterColumn).toBeInTheDocument();
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    expect(selectFilterComparison).toBeInTheDocument();
    const inputValueFilter = screen.getByTestId("value-filter");
    expect(inputValueFilter).toBeInTheDocument();
    const btnFilter = screen.getByTestId("button-filter");
    expect(btnFilter).toBeInTheDocument();

  });
  it("tests the table", async () => {
    render(<App />);
    await waitFor(() => {
      const table = screen.getByRole("table");
      expect(table).toBeInTheDocument();
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets).toBeInTheDocument();
      });
    });
  });
});
describe("Filter's tests", () => {
  it("tests name filter", async () => {
    render(<App />);
    const inputNameFilter = screen.getByTestId("name-filter");
    userEvent.type(inputNameFilter, "alderaan");
    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(1);
      });
    });
  });
  it("tests population filter", async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "population");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 1000);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(7);
      });
    });
  });
  it("test orbital period filter", async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "orbital_period");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "menor que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 400);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(5);
      });
    });
  });
  it("tests diameter filter", async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "diameter");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "igual a");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 7200);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(1);
      });
    });
  });
  it("tests rotation period filter", async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "rotation_period");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "menor que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 24);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(5);
      });
    });
  });
  it("tests surface water filter", async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "surface_water");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 10);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(4);
      });
    });
  });
  it('tests delete all button', async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "surface_water");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 10);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    const deleteAll = screen.getByTestId('button-remove-filters');
    expect(deleteAll).toBeInTheDocument();
    userEvent.click(deleteAll);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(10);
      });
    });
  });
  it('tests single delete button', async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "surface_water");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 10);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    const singleDelete = screen.getByTestId('delete-0');
    expect(singleDelete).toBeInTheDocument();
    userEvent.click(singleDelete);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(10);
      });
    });
  });
  it('tests single delete button with 2 entries', async () => {
    render(<App />);
    const selectFilterColumn = screen.getByTestId("column-filter");
    userEvent.selectOptions(selectFilterColumn, "surface_water");
    const selectFilterComparison = screen.getByTestId("comparison-filter");
    userEvent.selectOptions(selectFilterComparison, "maior que");
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 10);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);

    const singleDelete = screen.getByTestId('delete-0');
    expect(singleDelete).toBeInTheDocument();

    userEvent.selectOptions(selectFilterColumn, "population");
    userEvent.type(inputValueFilter, 12500);
    expect(inputValueFilter).toHaveValue(0)
    userEvent.selectOptions(selectFilterComparison, "igual a");
    userEvent.click(btnFilter);

    const singleDelete2 = screen.getByTestId('delete-1');
    expect(singleDelete2).toBeInTheDocument();

    userEvent.click(singleDelete);
    userEvent.click(singleDelete2);

    await waitFor(() => {
      waitFor(() => {
        const planets = screen.getAllByTestId("planet-name");
        expect(planets.length).toBe(10);
      });
    });
  });

});
