import express from 'express';
import path from 'path';

const app = express();
app.use(express.static(path.resolve(__dirname, '../dist')));
app.listen(3001, () => {
    console.log('server is running on http://localhost:3001')
})