import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CoreModule} from "../core/core.module";

import {HomepageComponent} from "./homepage/homepage.component";
import {HomepageNavigationComponent} from "./homepage/homepage-navigation.component";

import {PageComponent} from "./page.component";
import {PageEditComponent} from "./page-edit.component";
import {PageSourceComponent} from "./page-source.component";
import {PageService} from "./page.service";

import {TableContentComponent} from "./tablecontent/tablecontent.component";

import {GalleryContentComponent} from "./gallerycontent/gallerycontent.component";

@NgModule({
    imports: [
        CoreModule,
        RouterModule,
    ],
    declarations: [
        HomepageComponent,
        HomepageNavigationComponent,
        PageComponent,
        PageEditComponent,
        PageSourceComponent,
        TableContentComponent,
        GalleryContentComponent,
    ],
    providers: [
        PageService,
    ],
    exports: [
        PageEditComponent,
        PageSourceComponent,
    ]
})
export class PagesModule {}
