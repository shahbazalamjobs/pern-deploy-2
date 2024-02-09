import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:5173'
}));

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'simple',
    password: 'admin',
    port: 5432,
});

app.use(bodyParser.json());

// app.get('/messages', async (req, res) => {
app.get('/messages', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT content FROM messages');
        console.log(rows);
        res.json(rows);

    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
        console.log(err)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

