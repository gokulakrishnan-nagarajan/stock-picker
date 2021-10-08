import React from 'react';

import Search from './features/search/Search';
import StockList from './features/stockList/StockList';

import logo from './logo.svg';

import './global.css';
import './App.css';

function App() {
  return (
    <div className="app-container flex-column">
      <div className="app-title flex-shrink-0 center-center">Stock Picker</div>
      <Search />
      <StockList />
    </div>
  );
}

export default App;
