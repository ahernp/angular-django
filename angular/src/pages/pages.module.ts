import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from "../core/core.module";

import {HomepageComponent} from "./homepage/homepage.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";

import {PageComponent} from "./page.component";
import {PageSourceComponent} from "./page-source.component";
import {PageService} from "./page.service";

import {TableContentComponent} from "./tablecontent/tablecontent.component";

@NgModule({
    imports: [
        CoreModule,
        RouterModule,
    ],
    declarations: [
        HomepageComponent,
        HomepageNavigationComponent,
        PageComponent,
        PageSourceComponent,
        TableContentComponent,
    ],
    providers: [
        PageService,
    ],
    exports: [
        PageSourceComponent,
    ]
})
export class PagesModule {}
