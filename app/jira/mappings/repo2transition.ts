import { github } from '../../../@types/github';
import { ghRepo2JiraProjectKeys } from './repo2project';
import config from '../../../config.json';
import { IConfig } from '../../../@types/config';

export function ghRepoToJiraTransitionId(
	transitionName: string,
	repository: github.Repository
): string {
	const projectKeys = ghRepo2JiraProjectKeys(repository);

	const transitions = (<IConfig>config).jira.projects[projectKeys]
		.transitions;

	if (transitions) {
		return transitions[transitionName] || '';
	}

	return '';
}
