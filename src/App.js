import React from 'react';
import AppProvider from './context/AppProvider';
import Table from './components/Table';

function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}

export default App;
