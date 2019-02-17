/**
 * Get a list of the transitions possible for this issue by the current user,
 * along with fields that are required and their types.
 *
 * Fields will only be returned if expand=transitions.fields.
 *
 * The fields in the metadata correspond to the fields in the transition screen
 * for that transition. Fields not in the screen will not be in the metadata.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-getTransitions
 */

import { api } from '../api';
import { jira } from '../../../@types/jira';

export async function getTransition(
	issue: jira.Issue,
	transitionId: string
): Promise<jira.Transition> {
	const response = (await api.get(`/issue/${issue.id}/transitions`, {
		qs: {
			expand: 'transitions.fields',
			transitionId: transitionId
		}
	})) as jira.TransitionsResponse;

	const { transitions } = response.body;

	return transitions[0];
}
