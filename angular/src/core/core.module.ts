import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {BreadcrumbComponent} from "./breadcrumbs/breadcrumb.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";

import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";

import {MarkdownComponent} from "./markdown/markdown.component";
import {MarkdownToHtmlPipe} from "./markdown/markdown.pipe";

import {MessageComponent} from "./message/message.component";
import {MessageService} from "./message/message.service";

import {SearchComponent} from "./search/search.component";

import {SpinnerComponent} from "./spinner/spinner.component";

import {TableComponent} from "./table/table.component";

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
        SearchComponent,
        TableComponent,
        MarkdownComponent,
        MarkdownToHtmlPipe,
        MessageComponent,
    ],
    providers: [
        BreadcrumbService,
        MessageService,
    ],
    exports: [
        CommonModule,
        FormsModule,
        HeaderComponent,
        FooterComponent,
        BreadcrumbComponent,
        SpinnerComponent,
        TableComponent,
        MarkdownComponent,
    ]
})
export class CoreModule {}
