import {Component, Input, OnInit} from '@angular/core';

var filterableStrings: string[];

@Component({
    selector: 'ad-table',
    template: `
        <input [(ngModel)]="filterString" (ngModelChange)="filterRows($event)" placeholder="Filter">
        <table>
            <thead>
                <tr><th *ngFor="let columnHeading of columnHeadings">{{columnHeading}}</th></tr>
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
}
