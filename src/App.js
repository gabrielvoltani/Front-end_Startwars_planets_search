import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';
import Filter from './components/Filter';

function App() {
  return (
    <AppProvider>
      <Filter />
      <Table />
    </AppProvider>
  );
}

export default App;
