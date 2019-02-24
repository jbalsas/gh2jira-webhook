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
			[ghEntity: string]: string;
		};
	};
	transitions: {
		[jiraIssueType: string]: {
			[transitionName: string]: TransitionConfig;
		};
	};
}

interface ServerConfig {
	port: number;
	verifyRequest?: boolean;
}

export interface TransitionConfig {
	resolutionName: string;
	transitionId: string;
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
