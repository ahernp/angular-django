import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

import {AuthService} from "./auth/auth.service";
import {LoginComponent} from "./auth/login.component";

import {BreadcrumbComponent} from "./breadcrumbs/breadcrumb.component";
import {BreadcrumbService} from "./breadcrumbs/breadcrumb.service";

import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

import {MarkdownComponent} from "./markdown/markdown.component";
import {MarkdownToHtmlPipe} from "./markdown/markdown.pipe";

import {MessageComponent} from "./message/message.component";
import {MessageService} from "./message/message.service";

import {SchedulerService} from "./scheduler/scheduler.service";

import {SearchComponent} from "./search/search.component";

import {SpinnerComponent} from "./spinner/spinner.component";

import {TableComponent} from "./table/table.component";

import {TrimUrlPipe} from "./pipes/trimurl.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    declarations: [
        BreadcrumbComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        MarkdownComponent,
        MarkdownToHtmlPipe,
        MessageComponent,
        SearchComponent,
        SpinnerComponent,
        TableComponent,
        TrimUrlPipe,
    ],
    providers: [
        AuthService,
        BreadcrumbService,
        MessageService,
        SchedulerService,
    ],
    exports: [
        BreadcrumbComponent,
        CommonModule,
        FooterComponent,
        FormsModule,
        HeaderComponent,
        MarkdownComponent,
        MessageComponent,
        SpinnerComponent,
        TableComponent,
        TrimUrlPipe,
    ]
})
export class CoreModule {}
