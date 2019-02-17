import { github } from '../../../@types/github';

export function getCreatedGHMarker(issue: github.Issue) {
	return `_Created automatically from [${issue.html_url}|${issue.html_url}]_`;
}

export function getClosedGHMarker(issue: github.Issue) {
	return `_Closed automatically from [${issue.html_url}|${issue.html_url}]_`;
}
