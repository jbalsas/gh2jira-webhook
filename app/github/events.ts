import express from 'express';
import { github } from '../../@types/github';

export function isIssueCommentEvent(
	req: express.Request
): req is github.IssueCommentEvent {
	return req.body.comment;
}

export function isIssuesEvent(req: express.Request): req is github.IssuesEvent {
	return req.body.issue;
}

export function isPullRequestEvent(
	req: express.Request
): req is github.PullRequestEvent {
	return req.body.pull_request;
}
