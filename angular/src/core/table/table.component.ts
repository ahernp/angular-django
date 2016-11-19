import {Component, Input, OnInit} from '@angular/core';

var filterableStrings: string[];
var sortColumn: number;
var sortOrders: boolean[];

@Component({
    selector: 'ad-table',
    template: `
        <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter">
        <table>
            <thead>
                <tr><th *ngFor="let columnHeading of columnHeadings; let i = index" (click)="sortRows(i)">{{columnHeading}}</th></tr>
            </thead>
            <tbody>
                <tr *ngFor="let row of currentRows">
                    <td *ngFor="let column of row">{{column}}</td>
                </tr>
            </tbody>
        </table>
        `
})
export class TableComponent implements OnInit {
    @Input() columnHeadings: string[];
    @Input() rows: string[][];

    filterString: string;
    currentRows: string[][];

    ngOnInit(): void {
        this.currentRows = this.rows;
        this.initialiseSortOrders(this.columnHeadings.length);
        this.populateFilterStrings();
    }

    populateFilterStrings(): void {
        filterableStrings = [];
        for (let row of this.rows) {
            filterableStrings.push(row.toString().toLocaleLowerCase());
        }
    }

    filterRows(): void {
        if (this.filterString.length < 2) {
            this.currentRows = this.rows;
            return;
        }
        let filterString = this.filterString.toLocaleLowerCase();
        this.currentRows = this.rows.filter(
            (value, index) => filterableStrings[index].indexOf(filterString) != -1);
    }

    initialiseSortOrders(numberOfHeadings: number): void {
        sortOrders = [];
        for (let i = 0; i < numberOfHeadings; i++)
            sortOrders.push(false);
    }

    compareRows(rowA: string[], rowB: string[]): number {
        if (rowA[sortColumn] === rowB[sortColumn])
            return 0;
        else
            if (sortOrders[sortColumn])
                return (rowA[sortColumn] > rowB[sortColumn]) ? -1 : 1;
            else
            return (rowA[sortColumn] < rowB[sortColumn]) ? -1 : 1;
    }

    sortRows(index: number): void {
        console.log(index);
        sortColumn = index;
        this.rows.sort(this.compareRows);
        this.populateFilterStrings();
        if (this.filterString != undefined)
            this.filterRows();
        sortOrders[sortColumn] = !sortOrders[sortColumn];
    }
}
