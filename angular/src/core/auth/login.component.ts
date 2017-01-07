import {Component} from '@angular/core';

@Component({
    selector: 'ad-login',
    template: `
        <div>
            <p>Login Form</p>
        </div>
    `,
    styles: [`
        div {
            position: absolute;
            bottom: 5px;
            width: 200px;
            height: 100px;
            border: solid 1px black;
            background: white;
        }
    `]
})
export class LoginComponent {
    constructor() {}
}
