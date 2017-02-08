import {Component, Input} from '@angular/core';

import {Section} from "./section";
import {Row} from "../../core/table/table";

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
export class TableContentComponent {
    @Input()
    set content(content: string) {
        this.parseContentIntoSections(content);
    }
    sections: Section[] = [];

    currentContent: string = '';
    currentColumnHeadings: string[] = [];
    currentRows: Row[] = [];

    parseContentIntoSections(content: string): void {
        this.sections = [];
        let lines: string[] = content.split('\n');
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf('|') > -1) {
                this.addContentSection();
                if (this.currentColumnHeadings.length == 0)
                    this.currentColumnHeadings = lines[i].split('|');
                else if (lines[i].indexOf('-----') == -1)
                    this.currentRows.push(<Row>{columns: lines[i].split('|').map(str => str.trim())});
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
            this.sections.push(<Section>{
                type: 'markdown',
                content: this.currentContent});
            this.currentContent = '';
        }
    }

    addTableSection(): void{
        if (this.currentRows.length > 0) {
            this.sections.push(<Section>{
                type: 'table',
                columnHeadings: this.currentColumnHeadings,
                rows: this.currentRows});
            this.currentColumnHeadings = [];
            this.currentRows = [];
        }
    }
}
