import { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filter() {
  const {
    planet,
    filtThePlanet,
    filtColumn,
    filtByColumn,
    filtCompare,
    filtByComparison,
    filtNum,
    filtByNum,
    handleClickFilter,
    filtFilter,
    accFilter,
    deleteOneFilter,
    deleteAllFilters,
  } = useContext(AppContext);

  return (
    <div>
      <div>
        <label htmlFor="name-filter">
          Filter by name:
          <input
            data-testid="name-filter"
            id="name-filter"
            type="text"
            value={ planet }
            onChange={ filtThePlanet }
          />
        </label>
      </div>
      <div>
        <label htmlFor="column-filter">
          Column:
          <select
            data-testid="column-filter"
            id="column-filter"
            value={ filtColumn }
            onChange={ filtByColumn }
          >
            {filtFilter.map((elem) => (
              <option key={ elem } value={ elem }>
                {elem}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparison:
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            value={ filtCompare }
            onChange={ filtByComparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Quantity:
          <input
            data-testid="value-filter"
            id="value-filter"
            type="number"
            value={ filtNum }
            onChange={ filtByNum }
          />
        </label>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleClickFilter }
        >
          Filter
        </button>
      </div>
      <div>
        <p>Running filters:</p>
        {accFilter.length > 0 && (
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ deleteAllFilters }
          >
            Delete All
          </button>
        )}
      </div>
      <div>
        {accFilter?.map((e, idx) => (
          <div data-testid="filter" key={ idx }>
            <h3>{`${e.filtColumn} ${e.filtCompare} ${e.value}`}</h3>
            <button
              type="button"
              data-testid={ `delete-${idx}` }
              onClick={ () => deleteOneFilter(e) }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
