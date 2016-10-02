import {Component} from '@angular/core';

@Component({
    selector: 'ad-cardgen',
    template: `
        <h1>Generate Card Output</h1>
        <p>
            Generate multiple cards from a single template by replacing
            label/references with equivalent data.
        </p>
        <p>
            <label>Data:<br>
                <textarea rows="4" cols="56" [(ngModel)]="dataRecords"></textarea>
            </label>
        </p>
        <p>Delimiter used in data: <input type="text" size="1" [(ngModel)]="delimiter" /></p>
        <p>
            <label>Template:<br>
                <textarea rows="4" cols="56" [(ngModel)]="cardTemplate"></textarea>
            </label>
        </p>
        <button (click)="generateCards()">Generate Cards</button>
        <p>
            <label>Output:<br>
                <textarea rows="4" cols="56" [(ngModel)]="generatedCards"></textarea>
            </label>
        </p>
    `
})
export class CardgenComponent {
    dataRecords: string = '#Name,#URL,#Description\nGoogle,www.google.com,Search engine.\nAmazon,www.amazon.co.uk,Bookshop.';
    delimiter: string = ',';
    cardTemplate: string = '<li>#Name <a href="https://#URL" title="#Description"> #URL</a> #Description</li>';
    generatedCards: string = '<li>Google <a href="https://www.google.com" title="Search engine."> www.google.com</a> Search engine.</li>\n<li>Amazon <a href="https://www.amazon.co.uk" title="Bookshop."> www.amazon.co.uk</a> Bookshop.</li>';

    generateCards(): void {
        // First data record contains labels
        var data_records = this.dataRecords.split('\n');
        var labels = data_records[0].split(this.delimiter);
        var output_string = '';
        for (var i = 1; i < data_records.length; i++) {
            var curr_card = this.cardTemplate;
            var curr_data = data_records[i].split(this.delimiter);
            for (var j = 0; j < curr_data.length; j++) {
                var curr_label = new RegExp(labels[j], "g");
                // Replace all occurrances of label with the equivalent data
                curr_card = curr_card.replace(curr_label, curr_data[j]);
            }
            output_string = output_string + curr_card + "\n";
        }
        this.generatedCards = output_string;
    }
}
