import {Component, Input, OnInit} from '@angular/core';

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
    }

    filterRows(): void {
        if (this.filterString.length < 2) {
            this.currentRows = this.rows;
            return;
        }
        var filter = this.filterString.toLocaleLowerCase();
        this.currentRows = this.rows.filter(row => row[0].toLocaleLowerCase()
                                                         .indexOf(filter) != -1);
    }
}
