const sizeMultiplier: any = {
    KB: 1000,
    MB: 1000000,
    GB: 1000000000
};
const sizeRegExp: RegExp = /^\d*\.?\d+(KB|MB|GB)$/i;

export class Table {
    public columnHeadings: string[];
    private rows: any[][];
    public currentRows: any[][];

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
        let sortColumn: number = index;
        var self: Table = this;

        let calcSize = (size: string): number => {
            let amountLength: number = size.length - 2;
            let sizeAmount: string = size.substring(0, amountLength);
            let sizeUnit: string = size.substring(amountLength);
            let numericSize: number = parseFloat(sizeAmount) * sizeMultiplier[sizeUnit.toUpperCase()];
            return numericSize;
        };
        let compareValues = (valueA: any, valueB: any): number => {
            if (valueA == valueB)
                return 0;
            else if (self.sortOrders[sortColumn])
                return (valueA > valueB) ? -1 : 1;
            else
                return (valueA < valueB) ? -1 : 1;
        };

        this.rows.sort((rowA: string[], rowB: string[]): number => {
            if (sizeRegExp.test(rowA[sortColumn]) && sizeRegExp.test(rowB[sortColumn])) {
                let valueA: number = calcSize(rowA[sortColumn]);
                let valueB: number = calcSize(rowB[sortColumn]);
                return compareValues(valueA, valueB);
            }
            else {
                let valueA: string = rowA[sortColumn] == undefined ? '' : rowA[sortColumn].toLocaleLowerCase();
                let valueB: string = rowB[sortColumn] == undefined ? '' : rowB[sortColumn].toLocaleLowerCase();
                return compareValues(valueA, valueB);
            }
        });
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
