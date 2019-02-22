import { github } from '../../../@types/github';
import config from '../../../config.json';
import { ghRepo2JiraProjectKeys } from './repo2project';
import { IConfig } from '../../../@types/config';
import { GHEntity } from '../../github/entitites';

export function ghIssueToJiraTypeNames(
	entity: GHEntity,
	repository: github.Repository
): string {
	const projectKeys = ghRepo2JiraProjectKeys(repository);

	return (<IConfig>config).jira.projects[projectKeys].createmeta.type[entity];
}
