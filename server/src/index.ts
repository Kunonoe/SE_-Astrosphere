import express from 'express';
import cors from 'cors';
import bodyParser from 'bodyParser';
import compression from 'compression';
import router from './Router';
const app = express();
const port = 5000;

const db = 1

app.use(cors())

app.use(bodyParser.json())
app.use(compression())

// readdirSync(path.join(__dirname, 'Router'))
//     .map((r:any) => app.use('/api', require('./Router/' + r)))

app.listen(port, () => {
  console.log(`Server running at 5000`);
});
app.use('/api',router());