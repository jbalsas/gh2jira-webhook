import { github } from '../../../@types/github';
import config from '../../../config.json';
import { ghRepo2JiraProjectKeys } from './repo2project';
import { IConfig } from '../../../@types/config';

export function ghIssueToJiraTypeNames(
	issue: github.Issue,
	repository: github.Repository
): string {
	const projectKeys = ghRepo2JiraProjectKeys(repository);

	return (<IConfig>config).jira.projects[projectKeys].createmeta.type;
}
