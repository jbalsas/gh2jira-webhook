import { closeIssue } from './jira/commands/closeIssue';
import { createIssue } from './jira/commands/createIssue';
import express from 'express';
import { createComment } from './jira/commands/createComment';
import {
	isIssueCommentEvent,
	isIssuesEvent,
	isPullRequestEvent
} from './github/events';
import { github } from '../@types/github';
import { CommentActions, IssueActions } from './github/actions';

export async function handler(
	req: express.Request,
	res: express.Response
): Promise<any> {
	let response = 'Unmapped GitHub Event';

	// Beware of checking condition order. Several conditions might apply at
	// the same time, so evaluation order does matter
	if (isIssueCommentEvent(req)) {
		const { action, comment, issue, repository } = req.body;

		console.log('Handling IssueComment Event');
		console.log(action);
		console.log(comment.body);
		console.log(issue.title);
		console.log(repository.full_name);

		if (action === CommentActions.CREATED) {
			response = await createComment(comment, issue, repository);
		}
	} else if (isIssuesEvent(req)) {
		const { action, issue, repository } = req.body;

		console.log('Handling Issue Event');
		console.log(action);
		console.log(issue.title);
		console.log(repository.full_name);

		if (action === IssueActions.CLOSED) {
			response = await closeIssue(issue, repository);
		} else if (action === IssueActions.OPENED) {
			response = await createIssue(issue, repository);
		}
	} else if (isPullRequestEvent(req)) {
		const { action, pull_request } = req.body;
	}

	res.send(response);
}
