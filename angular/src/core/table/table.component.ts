import {Component, Input, OnInit} from '@angular/core';

import {Table} from './table'

@Component({
    selector: 'ad-table',
    template: `
        <input [(ngModel)]="filterString" (ngModelChange)="filterRows()" placeholder="Filter" tabindex="2">
        <span *ngIf="table.currentRows.length != table.rows.length">{{table.currentRows.length}} of</span>
        {{table.rows.length}} rows
        <table>
            <thead>
                <tr><th *ngFor="let columnHeading of table.columnHeadings; let i = index" (click)="table.sortRows(i)">{{columnHeading}}</th></tr>
            </thead>
            <tbody>
                <tr *ngFor="let row of table.currentRows; let odd=odd; let even=even;" [ngClass]="{ odd: odd, even: even }">
                    <td *ngFor="let column of row">{{column}}</td>
                </tr>
            </tbody>
        </table>
        `
})
export class TableComponent implements OnInit {
    @Input() columnHeadings: string[];
    @Input() rows: string[][];

    table: Table;
    filterString: string;

    ngOnInit(): void {
        this.table = new Table(this.columnHeadings, this.rows);
    }

    filterRows(): void {
        this.table.setFilterString(this.filterString);
    }
}
