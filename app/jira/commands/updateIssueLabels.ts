/**
 * Edits an issue from a JSON representation.
 *
 * The issue can either be updated by setting explicit the field value(s) or by
 * using an operation to change the field value.
 *
 * The fields that can be updated, in either the fields parameter or the update
 * parameter, can be determined using the /rest/api/2/issue/{issueIdOrKey}/editmeta
 * resource. If a field is not configured to appear on the edit screen, then it
 * will not be in the editmeta, and a field validation error will occur if it is
 * submitted.
 *
 * Specifying a "field_id": field_value in the "fields" is a shorthand for a
 * "set" operation in the "update" section.
 *
 * Field should appear either in "fields" or "update", not in both.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-editIssue
 */

import { api } from '../api';
import { github } from '../../../@types/github';
import { getIssue } from '../queries/getIssue';

export async function updateIssueLabels(
	issue: github.Issue,
	repository: github.Repository
): Promise<any> {
	const jiraIssue = await getIssue(issue, repository);
	const payload = {
		fields: {
			labels: issue.labels.map(label => label.name)
		}
	};

	return await api.put(`/issue/${jiraIssue.key}`, {
		body: payload
	});
}
