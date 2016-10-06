import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {BreadcrumbComponent} from "../breadcrumbs/breadcrumb.component";
import {routing} from "../app.routing";


@NgModule({
    imports: [
        CommonModule,
        routing,
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
