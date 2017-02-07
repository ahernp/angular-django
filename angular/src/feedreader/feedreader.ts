export class Entry {
    id: number;
    title: string;
    link: string;
    description: string;
    publishedTime: string;
    feedTitle: string;
    groupName: string;
    readFlag: boolean;
}

export class Feed {
    id: number;
    feedTitle: string;
    feedUrl: string;
    siteUrl: string;
    feedDescription: string;
    groupId: number;
    groupName: string;
}

export class Group {
    id: number;
    name: string;
}

export class FeedCountDictionary {
    [feedTitle: string]: number
}

export class GroupCountDictionary {
    [groupName: string]: {
        count: number,
        feedCounts: FeedCountDictionary
    }
}

export class FeedCount {
    name: string;
    count: number;
    selected: boolean;
}

export class GroupCount {
    name: string;
    count: number;
    selected: boolean;
    feedCounts: FeedCount[];
}
