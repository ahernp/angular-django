export class Entry {
    title: string;
    link: string;
    description: string;
    publishedTime: string;
    feedTitle: string;
    groupName: string;
}

export class Feed {
    feedTitle: string;
    groupName: string;
}

export class FeedCounts {
    [feedTitle: string]: number
}

export class GroupCounts {
    [groupName: string]: {
        count: number,
        feeds: FeedCounts
    }
}
