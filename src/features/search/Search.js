import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSymbol } from '../../app/reducers/symbolSlice';

import './Search.css';

const symbols = [
    'AAPL',
    'ADSK',
    'BNS',
    'BOH',
    'CASH',
    'CATY',
    'DAWN',
    'DBGI',
    'EXTN',
    'EYPT',
    'FEDU',
    'FFBW',
    'IBM',
];

function Search() {
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState('');
    const [filteredSymbols, setFilteredSymbols] = useState([]);
    const [notFoundFlag, setNotFoundFlag] = useState(false);

    useEffect(() => {
        const processedText = searchText.toLocaleLowerCase();
        if(processedText.length > 0) {
            setFilteredSymbols(symbols.filter((symbol) => symbol.toLocaleLowerCase().indexOf(processedText) !== -1));
        } else {
            setFilteredSymbols([]);
        }
    }, [searchText]);

    const searchTextChanged = (e) => {
        const value = e.target.value.trim();
        setSearchText(value);
        setNotFoundFlag(false);
    };

    const keyPressed = (e) => {
        if(e.key === "Enter") {
            matchSearchText();
        }
    };

    const symbolSelected = (symbol) => {
        setSearchText('');
        dispatch(addSymbol(symbol));
    };

    const suggestionList = filteredSymbols.map((symbol) => {
        return (
            <div key={symbol} className="suggestion-item" onClick={() => symbolSelected(symbol)}>{symbol}</div>
        );
    });

    const matchSearchText = () => {
        const matchResult = symbols.filter((symbol) => symbol.toLocaleLowerCase() === searchText.toLowerCase());
        if(matchResult.length > 0) {
            symbolSelected(matchResult[0]);
        } else {
            setNotFoundFlag(true);
        }
    };

    return (
        <div className="search-container flex-shrink-0 center-center">
            <div className="search-content">
                <input className={`search-input ${notFoundFlag ? 'error' : ''}`} type="text" placeholder="Search" value={searchText} onChange={searchTextChanged} onKeyPress={keyPressed} />
                {
                    suggestionList.length > 0 ?
                        <div className="suggestion-container">{suggestionList}</div>
                    :
                        null
                }
            </div>
            <button className="search-btn" onClick={matchSearchText}>Search</button>
        </div>
    );
}

export default Search;