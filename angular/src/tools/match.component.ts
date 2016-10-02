import {Component} from '@angular/core';

@Component({
    selector: 'ad-match',
    template: `
        <h1>Match Records</h1>
        <p>Keep or exclude matching records.</p>
        <p>
            <label>Input:<br />
            <textarea [(ngModel)]="inputString" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>
            <label>Keys:<br />
            <textarea [(ngModel)]="keyString" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>
            <button (click)="match()">Check for Matches</button>
            <input [(ngModel)]="excludeFlag" type="checkbox" name="Exclude matches">
            Exclude matches
        </p>
        <p>
            <label>Output:<br />
            <textarea [(ngModel)]="output" rows="4" cols="56"></textarea>
            </label>
        </p>
    `
})

export class MatchComponent {
    inputString: string = 'Record3\nRecord4\nRecord4\nRecord1';
    keyString: string = 'Record4\nRecord1';
    excludeFlag: Boolean;
    output: string = 'Record4\nRecord4\nRecord1';

    match(): void {
        var inputRecords: string[] = this.inputString.split('\n');
        var keyRecords: string[] = this.keyString.split('\n');
        var outputString: string = "";
        for (var i = 0; i < inputRecords.length; i++) {
            var match_found = false;
            for (var j = 0; j < keyRecords.length; j++) {
                if (inputRecords[i].indexOf(keyRecords[j]) > -1) {
                    match_found = true;
                    break;
                }
            }
            if ((!match_found && this.excludeFlag) || (match_found && !this.excludeFlag))
                outputString = outputString + inputRecords[i] + "\n";
        }
        this.output = outputString;
    }
}
