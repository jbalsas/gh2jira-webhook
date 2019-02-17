import RestApiClient from 'gh/lib/rest-api-client';
import config from '../../config.json';
import { IConfig } from '../../@types/config.js';

const nodeEnv = process.env.NODE_ENV || 'prod';
const connection = (<IConfig>config).jira.connection[nodeEnv];

const password = process.env.JIRA_PASSWORD || '';
const user = process.env.JIRA_USER || '';

const api = new RestApiClient({
	password,
	user,
	...connection
});

export { api };
