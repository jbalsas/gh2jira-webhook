import { github } from '../../../@types/github';
import { ghRepo2JiraProjectKeys } from './repo2project';
import config from '../../../config.json';
import { IConfig, TransitionConfig } from '../../../@types/config';

export function ghRepoToJiraTransition(
	jiraIssueType: string,
	transitionName: string,
	repository: github.Repository
): TransitionConfig | undefined {
	const projectKeys = ghRepo2JiraProjectKeys(repository);

	const transitions = (<IConfig>config).jira.projects[projectKeys]
		.transitions;

	if (transitions) {
		return transitions[jiraIssueType][transitionName];
	}
}
