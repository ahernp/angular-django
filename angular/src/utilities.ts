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
        var sortColumn: number = index;
        var self: Table = this;
        this.rows.sort((rowA: string[], rowB: string[]): number => {
            let valueA = rowA[sortColumn] == undefined ? '' : rowA[sortColumn].toLocaleLowerCase();
            let valueB = rowB[sortColumn] == undefined ? '' : rowB[sortColumn].toLocaleLowerCase();
            if (valueA == valueB)
                return 0;
            else
                if (self.sortOrders[sortColumn])
                    return (valueA > valueB) ? -1 : 1;
                else
                    return (valueA < valueB) ? -1 : 1;
            })
        this.populateFilterStrings();
        if (this.filterString != undefined)
            this.filterRows();
        this.sortOrders[sortColumn] = !this.sortOrders[sortColumn];
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
}
