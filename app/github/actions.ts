export const enum CommentActions {
	CREATED = 'created',
	DELETED = 'deleted',
	EDITED = 'edited'
}

export const enum IssueActions {
	ASSIGNED = 'assigned',
	CLOSED = 'closed',
	DELETED = 'deleted',
	DEMILESTONED = 'demilestoned',
	EDITED = 'edited',
	LABELED = 'labeled',
	MILESTONED = 'milestoned',
	OPENED = 'opened',
	PINNED = 'pinned',
	REOPENED = 'reopened',
	TRANSFERRED = 'transferred',
	UNASSIGNED = 'unassigned',
	UNLABELED = 'unlabeled',
	UNPINNED = 'unpinned'
}

export const enum PullRequestActions {
	ASSIGNED = 'assigned',
	UNASSIGNED = 'unassigned',
	REVIEW_REQUESTED = 'review_requested',
	REVIEW_REQUEST_REMOVED = 'review_request_removed',
	LABELED = 'labeled',
	UNLABELED = 'unlabeled',
	OPENED = 'opened',
	EDITED = 'edited',
	CLOSED = 'closed',
	REOPENED = 'reopened'
}
