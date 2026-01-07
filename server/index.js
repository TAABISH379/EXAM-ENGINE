const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const generateRoutes = require('./routes/generateRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', generateRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Exam Engine AI is running.');
});

if (require.main === module) {
    const server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${PORT} is already in use.`);
        } else {
            console.error('Server error:', err);
        }
    });
}

module.exports = app;



