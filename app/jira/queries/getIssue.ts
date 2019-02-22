/**
 * Searches for issues using JQL.
 *
 * Sorting the jql parameter is a full JQL expression, and includes an ORDER BY
 * clause.
 *
 * The fields param (which can be specified multiple times) gives a
 * comma-separated list of fields to include in the response. This can be used
 * to retrieve a subset of fields. A particular field can be excluded by
 * prefixing it with a minus.
 *
 * By default, only navigable (*navigable) fields are returned in this search
 * resource. Note: the default is different in the get-issue resource -- the
 * default there all fields (*all).
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/search-search
 */

import { api } from '../api';
import { github } from '../../../@types/github';
import { jira } from '../../../@types/jira';
import { ghRepo2JiraProjectKeys } from '../mappings/repo2project';
import { getCreatedGHMarker } from '../mappings/ghmarker';

export async function getIssue(
	entity: github.Entity,
	repository: github.Repository
): Promise<jira.Issue> {
	const query = `project=${ghRepo2JiraProjectKeys(
		repository
	)} AND description ~ "${getCreatedGHMarker(entity)
		.replace('[', '\\\\[')
		.replace(']', '\\\\]')}"`;

	const response = (await api.get(
		`/search?jql=${encodeURIComponent(query)}`
	)) as jira.SearchResponse;

	const { issues } = response.body;

	return issues[0];
}
