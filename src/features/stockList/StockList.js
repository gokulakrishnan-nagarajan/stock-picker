import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSymbols, getCurrentSymbol, setCurrentSymbol } from '../../app/reducers/symbolSlice';

import StockDetails from '../stockDetails/StockDetails';

import './StockList.css';

function StockList() {
    const dispatch = useDispatch();
    const symbols = useSelector(getSymbols);
    const currentSymbol = useSelector(getCurrentSymbol);

    const symbolClicked = (symbol) => {
        dispatch(setCurrentSymbol(symbol));
    };

    const symbolNames = symbols.map((symbol) => {
        return (
            <div key={symbol} className={`list-item ${currentSymbol === symbol ? 'selected' : ''}`} onClick={() => symbolClicked(symbol)}>{symbol}</div>
        );
    });

    return (
        <div className="stock-list-container flex-column flex-grow-1">
            <div className="stock-list flex-center flex-shrink-0">{symbolNames}</div>
            <StockDetails symbol={currentSymbol} />
        </div>
    );
}

export default StockList;