import {Breadcrumb} from "../../core/breadcrumbs/breadcrumb";

export class SearchResults {
    titleMatches: SearchResult[] = [];
    contentMatches: SearchResult[] = [];
}

export class SearchResult {
    match: string;
    breadcrumb: Breadcrumb;
}
