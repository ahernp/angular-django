import {Component} from '@angular/core';

@Component({
    selector: 'ad-deduplicate',
    template: `
        <h1>Sort and Deduplicate</h1>
        <p>Sort and remove duplicates from a list:</p>
        <p>
            <label>Input:<br />
            <textarea [(ngModel)]="inputString" rows="4" cols="56"></textarea>
            </label>
        </p>
        <button (click)="deduplicate()">Run Deduplicate</button>
        <p>
            <label>Output:<br />
            <textarea [(ngModel)]="outputString" rows="4" cols="56"></textarea>
            </label>
        </p>
    `
})

export class DeduplicateComponent {
    inputString: string = 'Record3\nRecord4\nRecord4\nRecord1';
    outputString: string = 'Record1\nRecord3\nRecord4';

    deduplicate(): void {
        var inputRecords: string[] = this.inputString.split('\n').sort();
        var outputRecords: string = "";
        for (var i = 0; i < inputRecords.length - 1; i++) {
            // If next record is different add current to output
            if (inputRecords[i] != inputRecords[i + 1])
                outputRecords = outputRecords + inputRecords[i] + "\n";
        }
        if (inputRecords.length == 0 || inputRecords.length == 1)
            outputRecords = inputRecords[0];
        else
            outputRecords = outputRecords + inputRecords[inputRecords.length - 1] + "\n";
        this.outputString = outputRecords;
    }
}
