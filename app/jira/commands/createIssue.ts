/**
 * Creates an issue or a sub-task from a JSON representation.
 *
 * The fields that can be set on create, in either the fields parameter or the
 * update parameter can be determined using the /rest/api/2/issue/createmeta
 * resource. If a field is not configured to appear on the create screen, then
 * it will not be in the createmeta, and a field validation error will occur if
 * it is submitted.
 *
 * Creating a sub-task is similar to creating a regular issue, with two
 * important differences: the issueType field must correspond to a sub-task
 * issue type (you can use /issue/createmeta to discover sub-task issue types),
 * and you must provide a parent field in the issue create request containing
 * the id or key of the parent issue.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-createIssue
 */

import { api } from '../api';
import { github } from '../../../@types/github';
import { getCreateMeta } from '../queries/getCreateMeta';
import { getCreatedGHMarker } from '../mappings/ghmarker';
import { GHEntity } from '../../github/entitites';
import { getIssue } from '../queries/getIssue';
import { jira } from '../../../@types/jira';

export async function createIssue(
	issue: github.Issue,
	repository: github.Repository
): Promise<any> {
	const metadata = await getCreateMeta(GHEntity.ISSUE, repository);

	const payload: jira.FieldsPayload = {
		fields: {
			description: `
				${issue.body}

				${getCreatedGHMarker(issue)}
			`,
			summary: issue.title,
			...metadata
		}
	};

	const milestone = issue.milestone;

	if (milestone) {
		const epic = await getIssue(milestone, repository);

		if (epic) {
			payload.fields['customfield_12821'] = epic.key;
		}
	}

	return await api.post('/issue', {
		body: payload
	});
}
