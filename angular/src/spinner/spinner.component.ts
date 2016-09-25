import {Component, Input} from '@angular/core';


@Component({
    selector: 'ad-spinner',
    template: `
        <div id="spinner">
            <img src="/static/spinner.gif" alt="Please Wait" title="Please Wait">
        </div>
    `
})

export class SpinnerComponent {
}
