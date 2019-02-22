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

export const enum MilestoneActions {
	CLOSED = 'closed',
	CREATED = 'created',
	DELETED = 'deleted',
	EDITED = 'edited',
	OPENED = 'opened'
}

export const enum PullRequestActions {
	ASSIGNED = 'assigned',
	CLOSED = 'closed',
	EDITED = 'edited',
	LABELED = 'labeled',
	OPENED = 'opened',
	REOPENED = 'reopened',
	REVIEW_REQUEST_REMOVED = 'review_request_removed',
	REVIEW_REQUESTED = 'review_requested',
	UNASSIGNED = 'unassigned',
	UNLABELED = 'unlabeled'
}
