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
import { ghRepoToJiraTransition } from '../mappings/repo2transition';
import { getClosedGHMarker } from '../mappings/ghmarker';

export async function closeEpic(
	milestone: github.Milestone,
	repository: github.Repository
): Promise<any> {
	const transitionConfig = ghRepoToJiraTransition(
		'epic',
		'close',
		repository
	);

	if (!transitionConfig) {
		return Promise.reject('Transition Config not fount');
	}

	const jiraIssue = await getIssue(milestone, repository);

	if (!jiraIssue) {
		return Promise.reject('Issue not found');
	}

	const transitionId = transitionConfig.transitionId;

	const transition = await getTransition(jiraIssue, transitionId);

	if (!transition) {
		return Promise.reject('Transition not found');
	}

	const fields = transition.fields;

	const transitionResolution = fields.resolution.allowedValues.find(
		allowedValue => allowedValue.name === transitionConfig.resolutionName
	);

	let payload = {
		update: {
			comment: [
				{
					add: {
						body: getClosedGHMarker(milestone)
					}
				}
			]
		},
		fields: {
			resolution: transitionResolution
		},
		transition: {
			id: transitionId
		}
	};

	return await api.post(`/issue/${jiraIssue.id}/transitions`, {
		body: payload
	});
}
