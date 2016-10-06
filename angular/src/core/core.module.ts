import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {BreadcrumbComponent} from "../breadcrumbs/breadcrumb.component";

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
    ],
    providers: [],
    exports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
    ]
})

export class CoreModule {}
