import {NgModule} from '@angular/core';

import {CoreModule} from "../core/core.module";

import {MarkdownComponent} from "./markdown.component";
import {PageComponent} from "./page.component";
import {PageSourceComponent} from "./page-source.component";
import {PageService} from "./page.service";
import {MarkdownToHtmlPipe} from "./markdown.pipe";

@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        MarkdownComponent,
        PageComponent,
        PageSourceComponent,
        MarkdownToHtmlPipe,
    ],
    providers: [
        PageService,
    ],
    exports: [
        MarkdownComponent,
        PageSourceComponent,
    ]
})
export class PagesModule {}
