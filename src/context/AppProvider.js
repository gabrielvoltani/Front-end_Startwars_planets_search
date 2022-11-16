import { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';

function Provider({ children }) {
  const [data, setItem] = useState([]);

  useEffect(() => {
    const planetsApi = async () => {
      const fullLink = 'https://swapi.dev/api/planets';
      const response = await fetch(fullLink);
      const { results } = await response.json();
      const resultsFilter = results.filter((e) => delete e.residents);
      setItem(resultsFilter);
    };
    planetsApi();
  }, []);

  const toMemo = useMemo(() => ({ data }), [data]);

  return (
    <appContext.Provider value={ toMemo }>
      {children}
    </appContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;
