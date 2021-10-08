import React, { useEffect, useState } from 'react';

import './StockDetails.css';

function StockDetails({ symbol }) {
    const [details, setDetails] = useState(null);
    const [refreshInterval, setRefreshInterval] = useState(1000);
    const [currentPrice, setCurrentPrice] = useState(0);

    useEffect(() => {
        setDetails(null);

        if(symbol) {
            fetch('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + symbol + '&apikey=4KR3J9ZDE935C9TF')
                .then((response) => {
                    // console.log(symbol, response);
                    return response.json();
                })
                .then((data) => {
                    // console.log(data);
                    setDetails(data);
                });
        }
    }, [symbol]);

    useEffect(() => {
        setCurrentPrice(Math.random());

        let intervalHandle = setInterval(() => {
            setCurrentPrice(Math.random());
        }, refreshInterval);

        return () => {
            clearInterval(intervalHandle);
        };
    }, [refreshInterval]);

    const refreshIntervalChanged = (e) => {
        setRefreshInterval(e.target.value);
    };

    const getDetails = () => {
        return (
            <>
                <div className="detail-item flex-end">
                    <span className="detail-title">Price Refresh Interval:</span>
                    <select className="detail-value" value={refreshInterval} onChange={refreshIntervalChanged}>
                        <option value="1000">1 sec</option>
                        <option value="2000">2 sec</option>
                        <option value="5000">5 sec</option>
                    </select>
                </div>
                <div className="detail-item"><span className="detail-title">Name:</span><span className="detail-value">{details.Name}</span></div>
                <div className="detail-item"><span className="detail-title">Symbol:</span><span className="detail-value">{details.Symbol}</span></div>
                <div className="detail-item"><span className="detail-title">Description:</span><span className="detail-value">{details.Description}</span></div>
                <div className="detail-item"><span className="detail-title">Current Price:</span><span className="detail-value">{currentPrice}</span></div>
                <div className="detail-item"><span className="detail-title">Change traded on:</span><span className="detail-value">{details.Currency}</span></div>
                <div className="detail-item"><span className="detail-title">Industry:</span><span className="detail-value">{details.Industry}</span></div>
                <div className="detail-item"><span className="detail-title">PE Ratio:</span><span className="detail-value">{details.PERatio}</span></div>
                <div className="detail-item"><span className="detail-title">Market Cap:</span><span className="detail-value">{details.MarketCapitalization}</span></div>
            </>
        );
    };

    return (
        <div className="stock-details-container flex-grow-1">
            {
                symbol && symbol.length > 0 ?
                    (
                        details ?
                            getDetails()
                        :
                            <div className="loading center-center">Fetching data...</div>
                    )
                :
                    <div className="center-center">Please select a symbol to see details</div>
            }
        </div>
    );
}

export default StockDetails;