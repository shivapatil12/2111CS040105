const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

let windowState = [];

app.get('/numbers/:id', async (req, res) => {
    const { id } = req.params;
    let apiUrl;

    switch(id) {
        case 'p':
            apiUrl = 'http://20.244.56.144/test/primes';
            break;
        case 'f':
            apiUrl = 'http://20.244.56.144/test/fibo';
            break;
        case 'e':
            apiUrl = 'http://20.244.56.144/test/even';
            break;
        case 'r':
            apiUrl = 'http://20.244.56.144/test/rand';
            break;
        default:
            return res.status(400).send('Invalid ID');
    }

    try {
        const response = await axios.get(apiUrl, { timeout: 500 });
        const newNumbers = response.data.numbers.filter(num => !windowState.includes(num));

        const windowPrevState = [...windowState];

        windowState = [...windowState, ...newNumbers].slice(-WINDOW_SIZE);

        const average = windowState.length > 0
            ? (windowState.reduce((a, b) => a + b, 0) / windowState.length).toFixed(2)
            : 0;

        res.json({
            windowPrevState,
            windowCurrState: windowState,
            numbers: newNumbers,
            avg: average,
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Failed to fetch numbers');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
