import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './AppContext';

function AppProvider({ children }) {
  const [data, setItem] = useState([]);
  const [planet, planetName] = useState('');
  const [filtColumn, setColumn] = useState('population');
  const [filtCompare, setCompare] = useState('maior que');
  const [filtNum, setNum] = useState('0');
  const [filtFilter, setFilter] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [starter, setStart] = useState([]);
  const [accFilter, setAcc] = useState([]);

  useEffect(() => {
    const api = async () => {
      const fullLink = 'https://swapi.dev/api/planets';
      const response = await fetch(fullLink);
      const { results } = await response.json();
      const resultsFiltered = results.filter((e) => delete e.residents);
      setItem(resultsFiltered);
      setStart(resultsFiltered);
    };
    api();
  }, []);

  const filtThePlanet = ({ target: { value } }) => {
    planetName(value);
  };

  const filtByColumn = ({ target: { value } }) => {
    setColumn(value);
  };

  const filtByComparison = ({ target: { value } }) => {
    setCompare(value);
  };

  const filtByNum = ({ target: { value } }) => {
    setNum(value);
  };

  const handleClickFilter = () => {
    const filtTheFilters = filtFilter.filter((e) => e !== filtColumn);
    setFilter(filtTheFilters);
    setColumn(filtTheFilters[0]);
    if (filtCompare === 'maior que') {
      const filtered = data.filter((e) => Number(e[filtColumn]) > Number(filtNum));
      setItem(filtered);
      setAcc([...accFilter, {
        filtColumn, filtCompare, value: filtNum, array: filtered,
      }]);
    }
    if (filtCompare === 'menor que') {
      const filtered = data.filter((e) => Number(e[filtColumn]) < Number(filtNum));
      setItem(filtered);
      setAcc([...accFilter, {
        filtColumn, filtCompare, value: filtNum, array: filtered,
      }]);
    }
    if (filtCompare === 'igual a') {
      const filtered = data.filter((e) => e[filtColumn] === filtNum);
      setItem(filtered);
      setAcc([...accFilter, {
        filtColumn, filtCompare, value: filtNum, array: filtered,
      }]);
    }
  };

  const deleteOneFilter = (em) => {
    if (accFilter.length === 1) {
      setItem(starter);
      setFilter([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
      setAcc([]);
    }
    if (accFilter.length >= 2) {
      const getFilter = accFilter.filter((e) => e.filtColumn !== em.filtColumn);
      setAcc(getFilter);
      setFilter([...filtFilter, em.filtColumn]);
      setItem(accFilter[accFilter.length - 2].array);
    }
  };

  const deleteAllFilters = () => {
    setItem(starter);
    setFilter([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setAcc([]);
  };

  const toMemo = useMemo(() => ({
    data,
    handleClickFilter,
    planet,
    filtThePlanet,
    filtColumn,
    filtByColumn,
    filtCompare,
    filtByComparison,
    filtNum,
    filtByNum,
    filtFilter,
    setFilter,
    accFilter,
    setAcc,
    deleteOneFilter,
    deleteAllFilters,
  }), [data, planet, filtColumn, filtCompare, filtNum, filtFilter, accFilter]);

  return (
    <appContext.Provider value={ toMemo }>
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default AppProvider;
