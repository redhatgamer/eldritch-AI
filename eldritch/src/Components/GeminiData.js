import React, { useState, useEffect } from 'react';
import { getPublicData } from '../service/geminiServices';

const GeminiData = () => {
    const [tickerData, setTickerData] = useState(null);

    useEffect(() => {
        const fetchTickerData = async () => {
            try {
                const data = await getPublicData('ticker/btcusd'); // Example endpoint: ticker for BTC-USD pair
                setTickerData(data);
            } catch (error) {
                // Handle error
                console.error('Error fetching Gemini data:', error);
            }
        };

        fetchTickerData();
    }, []);

    if (!tickerData) return <div>Loading Gemini data...</div>;

    return (
        <div>
            <h2>Gemini BTC-USD Ticker</h2>
            <p>Last Price: {tickerData.last}</p>
            <p>Volume: {tickerData.volume.BTC}</p>
            {/* Display other relevant data */}
        </div>
    );
};

export default GeminiData;