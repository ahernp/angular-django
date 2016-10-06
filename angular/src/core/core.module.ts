import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumbs/breadcrumb.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
    ],
    declarations: [
        BreadcrumbComponent,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        SpinnerComponent,
    ],
    providers: [
        BreadcrumbService,
    ],
    exports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        SpinnerComponent,
    ]
})
export class CoreModule {}
