const express = require('express');
const path = require('path');

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'src', 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'src', 'index.html'));
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running in port ${port}`));