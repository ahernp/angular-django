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
    cardTemplate: string = '<li>#Name <a href="https://#URL" title="#Description"> #URL</a> #Description</li>';
    dataRecords: string = '#Name,#URL,#Description\nGoogle,www.google.com,Search engine.\nAmazon,www.amazon.co.uk,Bookshop.';
    delimiter: string = ',';
    generatedCards: string = '<li>Google <a href="https://www.google.com" title="Search engine."> www.google.com</a> Search engine.</li>\n<li>Amazon <a href="https://www.amazon.co.uk" title="Bookshop."> www.amazon.co.uk</a> Bookshop.</li>';

    generateCards(): void {
        let dataRecords: string[] = this.dataRecords.split('\n');
        let labels: string[] = dataRecords[0].split(this.delimiter);
        let outputString: string = '';
        for (let i = 1; i < dataRecords.length; i++) {
            let currentCard: string = this.cardTemplate;
            let currentData: string[] = dataRecords[i].split(this.delimiter);
            for (let j = 0; j < currentData.length; j++) {
                let currentLabel: RegExp = new RegExp(labels[j], "g");
                currentCard = currentCard.replace(currentLabel, currentData[j]);
            }
            outputString = outputString + currentCard + "\n";
        }
        this.generatedCards = outputString;
    }
}
