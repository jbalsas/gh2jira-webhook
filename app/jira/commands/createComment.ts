/**
 * Adds a new comment to an issue.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-addComment
 */

import { api } from '../api';
import { getIssue } from '../queries/getIssue';
import { github } from '../../../@types/github';
import { getCreatedGHMarker } from '../mappings/ghmarker';

export async function createComment(
	comment: github.Comment,
	issue: github.Issue,
	repository: github.Repository
): Promise<any> {
	const jiraIssue = await getIssue(issue, repository);

	const payload = {
		body: `
			${comment.body}

			${getCreatedGHMarker(comment)}
		`
	};

	return await api.post(`/issue/${jiraIssue.id}/comment`, {
		body: payload
	});
}
