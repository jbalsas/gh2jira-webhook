import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import asyncHandler from 'express-async-handler';
import { abortOnError } from '../middleware/abortOnError';
import { verifyRequest } from '../middleware/verifyRequest';
import { handler } from './handler';
import config from '../config.json';
import { IConfig } from '../@types/config';

const nodeEnv = process.env.NODE_ENV || 'prod';
const server = (<IConfig>config).server[nodeEnv];

const app: express.Application = express();

app.use(abortOnError);
app.use(
	bodyParser.json(
		process.env.GITHUB_APP_SECRET ? { verify: verifyRequest } : {}
	)
);
app.use(morgan('combined'));

app.post('/', asyncHandler(handler));

app.listen(server.port, () => {
	console.log(`Listening on port ${server.port}`);
});
