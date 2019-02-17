/**
 * Perform a transition on an issue. When performing the transition you can
 * update or set other issue fields.
 *
 * The fields that can be set on transtion, in either the fields parameter or
 * the update parameter can be determined using the
 * /rest/api/2/issue/{issueIdOrKey}/transitions?expand=transitions.fields
 * resource. If a field is not configured to appear on the transition screen,
 * then it will not be in the transition metadata, and a field validation error
 * will occur if it is submitted. The updateHistory param adds the issues
 * retrieved by this method to the current user's issue history, if set to true
 * (by default, the issue history does not include issues retrieved via the REST
 * API). You can view the issue history in the JIRA application, via the Issues
 * dropdown or by using the lastViewed JQL field in an issue search.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-doTransition
 */

import { api } from '../api';
import { getIssue } from '../queries/getIssue';
import { github } from '../../../@types/github';
import { getTransition } from '../queries/getTransition';
import { ghRepoToJiraTransitionId } from '../mappings/repo2transition';
import { getClosedGHMarker } from '../mappings/ghmarker';

export async function closeIssue(
	issue: github.Issue,
	repository: github.Repository
): Promise<any> {
	const transitionId = ghRepoToJiraTransitionId('close', repository);
	const jiraIssue = await getIssue(issue, repository);
	const transition = await getTransition(jiraIssue, transitionId);

	const fields = transition.fields;
	const resolution =
		fields.resoulution && fields.resolution.allowedValues
			? fields.resolution.allowedValues[0]
			: '';

	let payload = {
		update: {
			comment: [
				{
					add: {
						body: getClosedGHMarker(issue)
					}
				}
			]
		},
		fields: {},
		transition: {
			id: transitionId
		}
	};

	if (resolution) {
		payload.fields = {
			resolution
		};
	}

	return await api.post(`/issue/${jiraIssue.id}/transitions`, {
		body: payload
	});
}
