import { getIssue } from '../getIssue';
import { github } from '../../../../@types/github';

describe('getIssue', () => {
	it('returns an existing issue from a mapped repository', async () => {
		const issue = {
			html_url: 'https://gh2jira.com/issues/1'
		} as github.Issue;
		const repository = {
			full_name: 'jbalsas/gh2jira-webhook-test'
		} as github.Repository;

		const jiraIssue = await getIssue(issue, repository);

		expect(jiraIssue).not.toBeUndefined();
		expect(jiraIssue.key).toEqual('GHJIRA-TEST-1');
	});

	it('returns undefined for unmapped repositories', async () => {
		const issue = {
			html_url: 'https://gh2jira.com/issues/1'
		} as github.Issue;
		const repository = {
			full_name: 'jbalsas/unmapped'
		} as github.Repository;

		const jiraIssue = await getIssue(issue, repository);

		expect(jiraIssue).toBeUndefined();
	});

	it('returns undefined for non synced issues', async () => {
		const issue = {
			html_url: 'https://gh2jira.com/issues/unsynced'
		} as github.Issue;
		const repository = {
			full_name: 'jbalsas/gh2jira-webhook-test'
		} as github.Repository;

		const jiraIssue = await getIssue(issue, repository);

		expect(jiraIssue).toBeUndefined();
	});
});
