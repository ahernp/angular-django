import {Component} from '@angular/core';
import {HeaderComponent} from './header.component'
import {ContentComponent} from './content.component'
import {FooterComponent} from './footer.component'

@Component({
    selector: 'ad-app',
    directives: [HeaderComponent, ContentComponent, FooterComponent],
    template: '<ad-header></ad-header><ad-content></ad-content><ad-footer></ad-footer>'
})


export class AppComponent {
}