import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

import {AuthService} from "./auth.service";


@Component({
    selector: 'ad-login',
    template: `
        <div>
            <h3>Login</h3>
            <form [formGroup]="loginForm" (ngSubmit)="doLogin()">
                <p><input formControlName="username" type="username" placeholder="Username"></p>
                <p><input formControlName="password" type="password" placeholder="Password"></p>
                <p><button type="submit">Log in</button></p>
            </form>
        </div>
    `,
    styles: [`
        div {
            position: absolute;
            bottom: 45px;
            border: solid 1px black;
            background: white;
            padding: 5px;
        }
    `]
})
export class LoginComponent {
    public loginForm = this.formBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required]
    });

    constructor(
        private authService: AuthService,
        public formBuilder: FormBuilder) {}

    doLogin() {
        let formData: any = this.loginForm.value;
        this.authService.login(formData['username'], formData['password']);
    }
}
