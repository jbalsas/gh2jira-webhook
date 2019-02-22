interface ConnectionConfig {
	base: string;
	host: string;
	port: string;
	password?: string;
	protocol: string;
	strictSSL: boolean;
	user?: string;
}

interface ProjectConfig {
	createmeta: {
		type: {
			[entity: string]: string;
		};
	};
	transitions: {
		[transition: string]: string;
	};
}

interface ServerConfig {
	port: number;
	verifyRequest?: boolean;
}

interface GithubRepoToJiraProjectMap {
	[ghRepo: string]: string;
}

export interface IConfig {
	server: {
		[env: string]: ServerConfig;
	};
	jira: {
		connection: {
			[env: string]: ConnectionConfig;
		};
		projects: {
			[projectKeys: string]: ProjectConfig;
		};
	};
	map: {
		[ghRepo: string]: string;
	};
}
