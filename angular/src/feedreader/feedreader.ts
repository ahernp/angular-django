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
        feeds: FeedCountDictionary
    }
}

export class FeedCount {
    name: string;
    count: number;
}

export class GroupCount {
    name: string;
    count: number;
    feeds: FeedCount[];
}
