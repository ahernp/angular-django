import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from "../core/core.module";

import {FeedreaderComponent} from "./feedreader.component";
import {FeedreaderEditComponent} from "./feedreader-edit.component";
import {FeedreaderService} from "./feedreader.service";


@NgModule({
    imports: [
        CoreModule,
        RouterModule,
    ],
    declarations: [
        FeedreaderComponent,
        FeedreaderEditComponent,
    ],
    providers: [
        FeedreaderService,
    ],
    exports: [
    ]
})
export class FeedreaderModule {}
