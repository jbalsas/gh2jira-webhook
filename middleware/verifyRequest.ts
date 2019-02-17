// From https://kiewic.com/validate-x-hub-signatue by @kiewic

import crypto from 'crypto';

// Calculate the X-Hub-Signature header value.
function getSignature(buf: Buffer) {
	var hmac = crypto.createHmac('sha1', process.env.GITHUB_APP_SECRET || '');

	hmac.update(buf);

	return `sha1=${hmac.digest('hex')}`;
}

// Verify function compatible with body-parser to retrieve the request payload.
// Read more: https://github.com/expressjs/body-parser#verify
export function verifyRequest(req: any, res: any, buf: Buffer, encoding: any) {
	var expected = req.headers['x-hub-signature'];
	var calculated = getSignature(buf);

	if (expected !== calculated) {
		throw new Error('Invalid signature.');
	}
}
