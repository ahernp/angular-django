import {NgModule} from '@angular/core';

import {CoreModule} from "../core/core.module";

import {MarkdownContentComponent} from "./markdown-content.component";
import {MarkdownPageDetailComponent} from "./markdown-page-detail.component";
import {MarkdownPageSourceComponent} from "./markdown-page-source.component";
import {MarkdownPageService} from "./markdown-page.service";
import {MarkdownToHtmlPipe} from "./markdown.pipe";

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        MarkdownContentComponent,
        MarkdownPageDetailComponent,
        MarkdownPageSourceComponent,
        MarkdownToHtmlPipe,
    ],
    providers: [
        MarkdownPageService,
    ],
    exports: [
        MarkdownContentComponent,
        MarkdownPageSourceComponent,
    ]
})
export class MarkdownPagesModule {}
