/**
 * Returns the meta data for creating issues. This includes the available
 * projects, issue types and fields, including field types and whether or not
 * those fields are required. Projects will not be returned if the user does not
 * have permission to create issues in that project.
 *
 * The fields in the createmeta correspond to the fields in the create screen
 * for the project/issuetype. Fields not in the screen will not be in the
 * createmeta.
 *
 * https://docs.atlassian.com/software/jira/docs/api/REST/7.12.0/#api/2/issue-getCreateIssueMeta
 */

import { api } from '../api';
import { jira } from '../../../@types/jira';
import { github } from '../../../@types/github';
import { ghRepo2JiraProjectKeys } from '../mappings/repo2project';
import { ghIssueToJiraTypeNames } from '../mappings/issue2type';

export async function getCreateMeta(
	issue: github.Issue,
	repository: github.Repository
): Promise<{
	issuetype: { id: string };
	project: { id: string };
}> {
	const projectKeys = ghRepo2JiraProjectKeys(repository);
	const issueTypeNames = ghIssueToJiraTypeNames(issue, repository);

	const response = (await api.get('/issue/createmeta', {
		qs: {
			projectKeys: projectKeys,
			issuetypeNames: issueTypeNames,
			expand: 'projects.issuetypes.fields'
		}
	})) as jira.IssueCreateMetaResponse;

	const { projects } = response.body;
	const project = projects[0];

	const metadata = {
		issuetype: {
			id: project.issuetypes[0].id
		},
		project: {
			id: project.id
		}
	};

	return metadata;
}
