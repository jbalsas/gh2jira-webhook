import express from 'express';
import {
	IssueActions,
	CommentActions,
	PullRequestActions,
	MilestoneActions
} from '../app/github/actions';

declare namespace github {
	export interface Comment extends Entity {
		author_association: string;
		body: string;
		created_at: string;
		issue_url: string;
		updated_at: string;
		user: github.User;
	}
	export interface Entity {
		id: number;
		node_id: string;
		html_url: string;
		url: string;
	}
	export interface Issue extends Entity {
		assignee: object;
		assigneees: Array<object>;
		author_association: string;
		body: string;
		closed_at: string;
		comments_url: string;
		comments: number;
		created_at: string;
		events_url: string;
		labels_url: string;
		labels: Array<object>;
		locked: boolean;
		milestone: github.Milestone;
		number: number;
		repository_url: string;
		repository: github.Repository;
		state: string;
		title: string;
		updated_at: string;
		user: github.User;
	}
	export interface IssueCommentEvent extends express.Request {
		body: IssueCommentPayload;
	}
	export interface IssueCommentPayload extends ReadableStream<Uint8Array> {
		action: CommentActions;
		comment: github.Comment;
		issue: github.Issue;
		repository: github.Repository;
	}
	export interface IssuesEvent extends express.Request {
		body: IssuePayload;
	}
	export interface IssuePayload extends ReadableStream<Uint8Array> {
		action: IssueActions;
		issue: github.Issue;
		repository: github.Repository;
	}
	export interface Milestone extends Entity {
		closed_at: string;
		closed_issues: number;
		created_at: string;
		creator: github.User;
		description: string;
		due_on: string;
		labels_url: string;
		number: number;
		open_issues: number;
		state: string;
		title: string;
		updated_at: string;
	}
	export interface MilestoneEvent extends express.Request {
		body: MilestonePayload;
	}
	export interface MilestonePayload extends ReadableStream<Uint8Array> {
		action: MilestoneActions;
		milestone: github.Milestone;
		repository: github.Repository;
	}
	export interface PullRequest extends Entity {
		additions: number;
		assignee: User;
		author_association: string;
		body: string;
		changed_files: number;
		closed_at: string;
		comments: number;
		commits: number;
		created_at: string;
		deletions: number;
		diff_url: string;
		issue_url: string;
		locked: false;
		maintainer_can_modify: boolean;
		merge_commit_sha: string;
		mergeable_state: string;
		mergeable: boolean;
		merged_at: string;
		merged_by: User;
		merged: boolean;
		number: number;
		patch_url: string;
		rebaseable: boolean;
		review_comments: number;
		state: string;
		title: string;
		updated_at: string;
		user: User;
	}
	export interface PullRequestEvent extends express.Request {
		body: PullRequestPayload;
	}
	export interface PullRequestPayload extends ReadableStream<Uint8Array> {
		action: PullRequestActions;
		number: number;
		pull_request: github.PullRequest;
	}
	export interface Repository {
		description: string;
		fork: boolean;
		full_name: string;
		html_url: string;
		name: string;
		url: string;
	}
	export interface User extends Entity {
		avatar_url: string;
		events_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		gravatar_id: string;
		login: string;
		organizations_url: string;
		received_events_url: string;
		repos_url: string;
		site_admin: boolean;
		starred_url: string;
		subscriptions_url: string;
		type: string;
	}
}
