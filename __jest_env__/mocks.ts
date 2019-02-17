const User = {
	login: '',
	id: 0,
	node_id: '',
	avatar_url: '',
	gravatar_id: '',
	url: '',
	html_url: '',
	followers_url: '',
	following_url: '',
	gists_url: '',
	starred_url: '',
	subscriptions_url: '',
	organizations_url: '',
	repos_url: '',
	events_url: '',
	received_events_url: '',
	type: '',
	site_admin: true
};

const Issue = {
	assignee: {},
	assigneees: [],
	author_association: '',
	body: '',
	closed_at: '',
	comments: 0,
	created_at: '',
	labels: [],
	locked: false,
	milestone: '',
	state: '',
	updated_at: '',
	url: '',
	user: User,
	comments_url: '',
	events_url: '',
	html_url: '',
	id: 0,
	labels_url: '',
	node_id: '',
	number: 1,
	repository_url: '',
	title: ''
};

const Repository = {};

export { Issue, Repository, User };
