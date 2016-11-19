import {Component, Input, OnInit} from '@angular/core';

import {Section} from "./section";

@Component({
    selector: 'ad-tablecontent',
    template: `
        <template ngFor let-section [ngForOf]="sections">
            <ad-markdown-content *ngIf="section.type == 'markdown'" [content]="section.content"></ad-markdown-content>
            <ad-table *ngIf="section.type == 'table'" [columnHeadings]="section.columnHeadings" [rows]="section.rows"></ad-table>
        </template>
        `,
    providers: []
})
export class TableContentComponent implements OnInit {
    @Input() content: string;
    sections: Section[] = [];

    currentContent: string = '';
    currentColumnHeadings: string[] = [];
    currentRows: string[][] = [];

    ngOnInit(): void {
        this.parseContentIntoSections();
    }

    parseContentIntoSections(): void {
        let lines: string[] = this.content.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('|') > -1) {
                this.addContentSection();
                if (this.currentColumnHeadings.length == 0)
                    this.currentColumnHeadings = lines[i].split('|');
                else if (lines[i].indexOf('-----') == -1)
                    this.currentRows.push(lines[i].split('|'));
            }
            else {
                this.addTableSection();
                this.currentContent = this.currentContent + '\n' + lines[i];
            }
        }
        this.addContentSection();
        this.addTableSection();
    }

    addContentSection(): void {
        if (this.currentContent != '') {
            this.sections.push({
                type: 'markdown',
                content: this.currentContent});
            this.currentContent = '';
        }
    }

    addTableSection(): void{
        if (this.currentRows.length > 0) {
            this.sections.push( {
                type: 'table',
                columnHeadings: this.currentColumnHeadings,
                rows: this.currentRows});
            this.currentColumnHeadings = [];
            this.currentRows = [];
        }

    }
}
