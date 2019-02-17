// Initially copied from https://github.com/robertkaucher/jira-rest-typescript
// MIT License

import { Response } from 'request';

declare namespace jira {
	export interface Attachment {
		self: string;
		id: string;
		filename: string;
		author: User;
		created: string;
		size: number;
		mimeType: string;
		content: string;
	}
	export interface AttachmentOptions {
		filename: string;
		mimeType?: string;
		content: string;
	}
	export interface AvatarUrls {
		'48x48': string;
		'24x24': string;
		'16x16': string;
		'32x32': string;
	}
	export interface Comment {
		self: string;
		id: string;
		author: User;
		body: string;
		updateAuthor: User;
		created: Date;
		updated: Date;
	}
	export interface Field {
		required: boolean;
		schema: {
			type: string;
			items: string;
			custom: string;
			customId: number;
		};
		name: string;
		hasDefaultValue: boolean;
		operations: string[];
		allowedValues: string[];
	}
	export interface Issue {
		expand: string;
		id: string;
		self: string;
		key: string;
		fields: {
			aggregatetimespent: any;
			fixVersions: any[];
			customfield_11200: string;
			resolution: any;
			assignee: User;
			status: IssueStatus;
			components: any[];
			aggregatetimeestimate: any;
			creator: User;
			subtasks?: IssuePartial[];
			reporter: User;
			progress: {
				progress: number;
				total: number;
			};
			priority: IssuePriority;
			issuetype: IssueType;
			timespent: any;
			project: ProjectPartial;
			created: string;
			lastViewed: any;
			labels: any[];
			versions: any[];
			worklog: {
				startAt: number;
				maxResults: number;
				total: number;
				worklogs: any[];
			};
			watches: {
				self: string;
				watchCount: number;
				isWatching: boolean;
				watchers: User[];
			};
			workratio: number;
			updated: string;
			timeoriginalestimate: any;
			description: string;
			summary: string;
			environment: any;
			duedate: any;
			comment: {
				startAt: number;
				maxResults: number;
				total: number;
				comments: Comment[];
			};
			attachment: Attachment[];
			issuelinks: IssueLink[];
			//TODO: add custom fields
		};
	}
	export interface IssueCreateMetaPayload {
		projects: jira.Project[];
	}
	export interface IssueCreateMetaResponse extends Response {
		body: IssueCreateMetaPayload;
	}
	export interface IssueLink {
		id: string;
		self: string;
		type: {
			id: string;
			name: string;
			inward: string;
			outward: string;
			self: string;
		};
		outwardIssue?: IssuePartial;
		innwardIssue?: IssuePartial;
	}
	export interface IssuePartial {
		id: string;
		key: string;
		self: string;
		fields: {
			summary: string;
			status: IssueStatus;
			priority: IssuePriority;
			issueType: IssueType;
		};
	}
	export interface IssuePriority {
		self: string;
		iconUrl: string;
		name: string;
		id: string;
	}
	export interface IssueStatus {
		self: string;
		description: string;
		iconUrl: string;
		name: string;
		id: string;
		statusCategory: {
			self: string;
			id: number;
			key: string;
			colorName: string;
			name: string;
		};
	}
	export interface IssueType {
		self: string;
		id: string;
		description: string;
		iconUrl: string;
		name: string;
		subtask: boolean;
		avatarId: number;
	}
	export interface IssueTypeOptions {
		description?: string;
		iconUrl?: string;
		name: string;
		subtask?: boolean;
		avatarId?: number;
	}
	export interface Project {
		expand: string;
		self: string;
		id: string;
		key: string;
		description: string;
		lead: User;
		components: {
			self: string;
			id: string;
			name: string;
			isAssigneeTypeValid: boolean;
		}[];
		issuetypes: IssueType[];
		assigneeType: string;
		versions: any[];
		name: string;
		roles: {
			'NewCommentClosed Notified': string;
			Administrators: string;
			Users: string;
			'Issue Updated Notified': string;
			'New Issue Notified': string;
		};
		avatarUrls: AvatarUrls;
		projectTypeKey: string;
	}
	export interface ProjectOptions {
		self?: string;
		id?: string;
		key: string;
		name?: string;
		avatarUrls?: AvatarUrls;
	}
	export interface ProjectPartial {
		self: string;
		id: string;
		key: string;
		name: string;
		avatarUrls: AvatarUrls;
	}
	export interface SearchPayload {
		expand: string;
		startAt: number;
		maxResults: number;
		total: number;
		issues: jira.Issue[];
	}
	export interface SearchResponse extends Response {
		body: jira.SearchPayload;
	}
	export interface Status {
		description: string;
		iconUrl: string;
		id: string;
		name: string;
		self: string;
		statusCategory: {
			self: string;
			id: number;
			key: string;
			colorName: string;
			name: string;
		};
	}
	export interface Transition {
		fields: {
			[key: string]: jira.Field;
		};
		id: string;
		name: string;
		to: jira.Status;
	}
	export interface TransitionsPayload {
		expand: string;
		transitions: jira.Transition[];
	}
	export interface TransitionsResponse extends Response {
		body: jira.TransitionsPayload;
	}
	export interface User {
		self?: string;
		name: string;
		key?: string;
		emailAddress?: string;
		avatarUrls?: AvatarUrls;
		displayName?: string;
		active?: boolean;
		timeZone?: string;
	}
}
