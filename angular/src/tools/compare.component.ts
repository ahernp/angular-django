import {Component} from '@angular/core';

@Component({
    selector: 'ad-compare',
    template: `
        <h1>Compare two lists</h1>
        <p>Sort and compare inputs.</p>
        <p>
            <label>First Input:<br />
            <textarea [(ngModel)]="firstInput" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>
            <label>Second Input:<br />
            <textarea [(ngModel)]="secondInput" rows="4" cols="56"></textarea>
            </label>
        </p>
        <button (click)="sortAndCompare()">Sort &amp; Compare</button>
        <p>
            <label>Output:<br />
            <textarea [(ngModel)]="result" rows="4" cols="56"></textarea>
            </label>
        </p>
        <p>If a line in First Input is missing from Second Input then it is included in Output with the prefix "D:".</p>
        <p>If a line in Second Input is missing from First Input then it is included in Output with the prefix "I:".</p>
    `
})
export class CompareComponent {
    firstInput: string = 'Record1\nRecord3\nRecord4';
    secondInput: string = 'Record1\nRecord2\nRecord3';
    result: string = 'Results: 2 matches; 1 inserts; 1 deletes.\nI:Record2\nD:Record4';

    sortAndCompare(): void {
        var inputLines1 = this.firstInput.split('\n').sort();
        var inputLines2 = this.secondInput.split('\n').sort();
        var resultString = "", position1 = 0, position2 = 0;
        var matchCount = 0; var insertCount = 0; var deleteCount = 0;
        while (position1 < inputLines1.length && position2 < inputLines2.length) {
            if (inputLines1[position1] > inputLines2[position2]) {
                resultString = resultString + "I:" + inputLines2[position2] + "\n";
                position2++; insertCount++;
            }
            else if (inputLines1[position1] < inputLines2[position2]) {
                resultString = resultString + "D:" + inputLines1[position1] + "\n";
                position1++; deleteCount++;
            }
            else {
                position1++; position2++; matchCount++;
            }
        }
        while (position1 < inputLines1.length) {
            resultString = resultString + "D:" + inputLines1[position1] + "\n";
            position1++; deleteCount++;
        }
        while (position2 < inputLines2.length) {
            resultString = resultString + "I:" + inputLines2[position2] + "\n";
            position1 = position2 + 2; insertCount++;
        }
        resultString = "Results: " + matchCount + " matches; " + insertCount + " inserts; " + deleteCount + " deletes.\n" + resultString;
        this.result = resultString;
    }
}
