import {Component} from '@angular/core';

@Component({
    selector: 'ad-match',
    template: `
        <h1>Match Records</h1>
        <p>Keep or exclude matching records.</p>
        <p>
            <label>Input:<br />
            <textarea [(ngModel)]="inputString" (ngModelChange)="match($event)" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>
            <label>Keys:<br />
            <textarea [(ngModel)]="keyString" (ngModelChange)="match($event)" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>
            <input [(ngModel)]="excludeFlag" (ngModelChange)="match($event)" type="checkbox" name="Exclude matches">
            Exclude matches
        </p>
        <p>
            <label>Output:<br />
            <textarea [ngModel]="output" rows="4" cols="56"></textarea>
            </label>
        </p>
    `
})
export class MatchComponent {
    excludeFlag: Boolean;
    inputString: string = 'Record3\nRecord4\nRecord4\nRecord1';
    keyString: string = 'Record4\nRecord1';
    output: string = 'Record4\nRecord4\nRecord1';

    match(): void {
        let inputRecords: string[] = this.inputString.split('\n');
        let keyRecords: string[] = this.keyString.split('\n');
        let outputString: string = "";
        for (let i = 0; i < inputRecords.length; i++) {
            let matchFound: boolean = false;
            for (let j = 0; j < keyRecords.length; j++) {
                if (inputRecords[i].indexOf(keyRecords[j]) > -1) {
                    matchFound = true;
                    break;
                }
            }
            if ((!matchFound && this.excludeFlag) || (matchFound && !this.excludeFlag))
                outputString = outputString + inputRecords[i] + "\n";
        }
        this.output = outputString;
    }
}
