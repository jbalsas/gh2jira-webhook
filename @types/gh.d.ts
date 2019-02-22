declare module 'gh/lib/rest-api-client' {
	import { Response } from 'request';

	interface RestApiClientOptions {
		base: string;
		host: string;
		password: string;
		protocol: string;
		strictSSL: boolean;
		user: string;
	}

	function request(
		method: string,
		path: string,
		params?: object
	): Promise<Response>;

	export default class RestApiClient {
		constructor(options: RestApiClientOptions);

		authorize(p: string): string;
		delete(url: string, params?: object): ReturnType<typeof request>;
		encode(uriComponent: string): string;
		get(url: string, params?: object): ReturnType<typeof request>;
		post(url: string, params?: object): ReturnType<typeof request>;
		put(url: string, params?: object): ReturnType<typeof request>;
		request(
			method: string,
			path: string,
			params?: object
		): Promise<Response>;
		url(pathname: string, query?: string): string;
	}
}
