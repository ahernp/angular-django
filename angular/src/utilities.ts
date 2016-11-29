export function leadingZero(amount: number): string {
    return amount < 10 ? `0${amount}` : `${amount}`;
}

export function toDateTimeString(date: Date): string {
    return '' +
        date.getFullYear() + '-' +
        leadingZero(date.getUTCMonth()) + '-' +
        leadingZero(date.getUTCDate()) + ' ' +
        leadingZero(date.getUTCHours()) + ':' +
        leadingZero(date.getUTCMinutes()) + ':' +
        leadingZero(date.getUTCSeconds())
}

export class Table {
    public columnHeadings: string[];
    private rows: string[][];
    public currentRows: string[][];

    private sortOrders: boolean[] = [];
    private filterableStrings: string[];

    private sortColumn: number;
    private filterString: string = '';

    constructor(columnHeadings: string[], rows: string[][]) {
        this.columnHeadings = columnHeadings;
        this.rows = rows;
        this.currentRows = rows;
        this.initialiseSortOrders(this.columnHeadings.length);
        this.populateFilterStrings();
    }

    public setFilterString(filterString: string): void {
        this.filterString = filterString;
        this.filterRows();
    }

    public sortRows(index: number): void {
        this.sortColumn = index;
        var self = this;
        this.rows.sort((rowA: string[], rowB: string[]): number => {
            if (rowA[self.sortColumn] === rowB[self.sortColumn])
                return 0;
            else
                if (self.sortOrders[self.sortColumn])
                    return (rowA[self.sortColumn] > rowB[self.sortColumn]) ? -1 : 1;
                else
                return (rowA[self.sortColumn] < rowB[self.sortColumn]) ? -1 : 1;
            })
        this.populateFilterStrings();
        if (this.filterString != undefined)
            this.filterRows();
        this.sortOrders[this.sortColumn] = !this.sortOrders[this.sortColumn];
    }

    private initialiseSortOrders(numberOfHeadings: number): void {
        for (let i = 0; i < numberOfHeadings; i++)
            this.sortOrders.push(false);
    }

    private populateFilterStrings(): void {
        this.filterableStrings = [];
        for (let row of this.rows)
            this.filterableStrings.push(row.toString().toLocaleLowerCase());
    }

    private filterRows(): string[][] {
        if (this.filterString.length < 2) {
            this.currentRows = this.rows;
            return this.currentRows;
        }
        let filterStringLowercase = this.filterString.toLocaleLowerCase();
        this.currentRows = this.rows.filter(
            (value, index) => this.filterableStrings[index].indexOf(filterStringLowercase) != -1);
        return this.currentRows;
    }

    private compareRows(rowA: string[], rowB: string[]): number {
        if (rowA[this.sortColumn] === rowB[this.sortColumn])
            return 0;
        else
            if (this.sortOrders[this.sortColumn])
                return (rowA[this.sortColumn] > rowB[this.sortColumn]) ? -1 : 1;
            else
            return (rowA[this.sortColumn] < rowB[this.sortColumn]) ? -1 : 1;
    }
}
