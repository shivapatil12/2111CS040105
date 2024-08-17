// src/AverageCalculator.js

import React, { useState } from 'react';
import axios from 'axios';

function AverageCalculator() {
    const [result, setResult] = useState(null);

    const fetchNumbers = async (type) => {
        try {
            const response = await axios.get(`http://localhost:9876/numbers/${type}`);
            setResult(response.data);
        } catch (error) {
            console.error('Error fetching numbers:', error.message);
        }
    };

    return (
        <div>
            <button onClick={() => fetchNumbers('e')}>Fetch Even Numbers</button>
            <button onClick={() => fetchNumbers('p')}>Fetch Prime Numbers</button>
            <button onClick={() => fetchNumbers('f')}>Fetch Fibonacci Numbers</button>
            <button onClick={() => fetchNumbers('r')}>Fetch Random Numbers</button>

            {result && (
                <div>
                    <h3>Results:</h3>
                    <p>Previous Window State: {JSON.stringify(result.windowPrevState)}</p>
                    <p>Current Window State: {JSON.stringify(result.windowCurrState)}</p>
                    <p>Fetched Numbers: {JSON.stringify(result.numbers)}</p>
                    <p>Average: {result.avg}</p>
                </div>
            )}
        </div>
    );
}

export default AverageCalculator;
