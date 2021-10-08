import { createSlice } from '@reduxjs/toolkit';

const symbolSlice = createSlice({
    name: 'symbol',
    initialState: {
        selectedSymbols: [],
        currentSymbol: '',
    },
    reducers: {
        addSymbol: (state, action) => {
            const symbol = action.payload;

            if(state.selectedSymbols.indexOf(symbol) === -1) {
                state.selectedSymbols.push(symbol);
            }

            state.currentSymbol = symbol;
        },
        setCurrentSymbol: (state, action) => {
            state.currentSymbol = action.payload
        },
    },
});

export const { addSymbol, setCurrentSymbol } = symbolSlice.actions;

export const getSymbols = (state) => state.symbol.selectedSymbols;
export const getCurrentSymbol = (state) => state.symbol.currentSymbol;

export default symbolSlice.reducer;
