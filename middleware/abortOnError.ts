// Express error-handling middleware function.
// Read more: http://expressjs.com/en/guide/error-handling.html
export function abortOnError(err: any, req: any, res: any, next: any) {
	if (err) {
		console.log(err);

		res.status(400).send({ error: 'Invalid signature.' });
	} else {
		next();
	}
}
