// src/App.js

import React from 'react';
import './App.css';
import './App.test'
import AverageCalculator from './AverageCalculator';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Average Calculator Microservice</h1>
                <AverageCalculator />
            </header>
        </div>
    );
}

export default App;
