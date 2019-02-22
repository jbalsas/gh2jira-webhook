import { closeIssue } from './jira/commands/closeIssue';
import { createIssue } from './jira/commands/createIssue';
import express from 'express';
import { createComment } from './jira/commands/createComment';
import {
	isIssueCommentEvent,
	isIssuesEvent,
	isPullRequestEvent,
	isMilestoneEvent
} from './github/events';
import {
	CommentActions,
	IssueActions,
	MilestoneActions
} from './github/actions';
import { createEpic } from './jira/commands/createEpic';
import { milestoneIssue } from './jira/commands/milestoneIssue';
import { demilestoneIssue } from './jira/commands/demilestoneIssue';

export async function handler(
	req: express.Request,
	res: express.Response
): Promise<any> {
	let response = 'Unmapped GitHub Event';

	try {
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
			} else if (action === IssueActions.DEMILESTONED) {
				response = await demilestoneIssue(issue, repository);
			} else if (action === IssueActions.MILESTONED) {
				response = await milestoneIssue(issue, repository);
			} else if (action === IssueActions.OPENED) {
				response = await createIssue(issue, repository);
			}
		} else if (isMilestoneEvent(req)) {
			const { action, milestone, repository } = req.body;

			console.log('Handling Milestone Event');
			console.log(action);
			console.log(milestone.title);
			console.log(repository.full_name);

			if (action === MilestoneActions.CREATED) {
				response = await createEpic(milestone, repository);
			}
		} else if (isPullRequestEvent(req)) {
			const { action, pull_request } = req.body;
		}
	} catch (error) {
		console.log(error);
		console.log(error.stack);
	}

	res.send(response);
}
