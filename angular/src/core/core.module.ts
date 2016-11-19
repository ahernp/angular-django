import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {BreadcrumbComponent} from "./breadcrumbs/breadcrumb.component";
import {SpinnerComponent} from "./spinner/spinner.component";
import {TableComponent} from "./table/table.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
    ],
    declarations: [
        BreadcrumbComponent,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        SpinnerComponent,
        TableComponent,
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
        TableComponent,
    ]
})
export class CoreModule {}
