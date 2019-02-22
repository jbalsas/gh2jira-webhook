import { github } from '../../../@types/github';

export function getCreatedGHMarker(entity: github.Entity) {
	return `_Created automatically from [${entity.html_url}|${
		entity.html_url
	}]_`;
}

export function getClosedGHMarker(entity: github.Entity) {
	return `_Closed automatically from [${entity.html_url}|${
		entity.html_url
	}]_`;
}
