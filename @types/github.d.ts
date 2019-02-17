import express from 'express';
import {
	IssueActions,
	CommentActions,
	PullRequestActions
} from '../app/github/actions';

declare namespace github {
	export interface Comment {
		url: string;
		html_url: string;
		issue_url: string;
		id: number;
		node_id: string;
		user: github.User;
		created_at: string;
		updated_at: string;
		author_association: string;
		body: string;
	}
	export interface Issue {
		assignee: object;
		assigneees: Array<object>;
		author_association: string;
		body: string;
		closed_at: string;
		comments: number;
		created_at: string;
		labels: Array<object>;
		locked: boolean;
		milestone: string;
		state: string;
		updated_at: string;
		url: string;
		user: github.User;
		comments_url: string;
		events_url: string;
		html_url: string;
		id: number;
		labels_url: string;
		node_id: string;
		number: number;
		repository: github.Repository;
		repository_url: string;
		title: string;
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
	export interface PullRequest {
		url: string;
		id: number;
		node_id: string;
		html_url: string;
		diff_url: string;
		patch_url: string;
		issue_url: string;
		number: number;
		state: string;
		locked: false;
		title: string;
		user: User;
		body: string;
		created_at: string;
		updated_at: string;
		closed_at: string;
		merged_at: string;
		merge_commit_sha: string;
		assignee: User;
		author_association: string;
		merged: boolean;
		mergeable: boolean;
		rebaseable: boolean;
		mergeable_state: string;
		merged_by: User;
		comments: number;
		review_comments: number;
		maintainer_can_modify: boolean;
		commits: number;
		additions: number;
		deletions: number;
		changed_files: number;
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
	export interface User {
		login: string;
		id: number;
		node_id: string;
		avatar_url: string;
		gravatar_id: string;
		url: string;
		html_url: string;
		followers_url: string;
		following_url: string;
		gists_url: string;
		starred_url: string;
		subscriptions_url: string;
		organizations_url: string;
		repos_url: string;
		events_url: string;
		received_events_url: string;
		type: string;
		site_admin: boolean;
	}
}
