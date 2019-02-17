const mountebank = require('mountebank');
const http = require('http');
const config = require('./imposters.json');

module.exports = async () => {
	global.__MOUNTEBANK__ = await mountebank.create({
		configfile: '__tests__/imposters.ejs',
		port: 2525,
		host: undefined,
		noParse: false,
		pidfile: 'mb.pid',
		nologfile: true,
		logfile: 'mb.log',
		loglevel: 'info',
		allowInjection: false,
		localOnly: false,
		ipWhitelist: ['*'],
		mock: false,
		debug: false,
		heroku: false
	});

	return new Promise((resolve, reject) => {
		const requestOptions = {
			method: 'PUT',
			path: '/imposters',
			port: 2525,
			hostname: 'localhost',
			headers: {
				'Content-Type': 'application/json',
				Connection: 'close'
			}
		};

		const request = http.request(requestOptions, response => {
			response.body = '';
			response.setEncoding('utf8');
			response.on('data', chunk => {
				response.body += chunk;
			});
			response.on('end', () => {
				response.body = JSON.parse(response.body);
				resolve(response);
			});
		});

		request.on('error', reject);
		request.write(JSON.stringify(config));
		request.end();
	});
};