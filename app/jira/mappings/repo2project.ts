import { github } from '../../../@types/github';
import config from '../../../config.json';
import { IConfig } from '../../../@types/config';

export function ghRepo2JiraProjectKeys(repository: github.Repository): string {
	return (
		(<IConfig>config).map[repository.full_name] ||
		(<IConfig>config).map[repository.name] ||
		''
	);
}
