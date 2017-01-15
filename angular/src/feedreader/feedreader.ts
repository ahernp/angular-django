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
    feedTitle: string;
    groupName: string;
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
