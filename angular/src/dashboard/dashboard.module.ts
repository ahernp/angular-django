import {NgModule} from '@angular/core';

import {CoreModule} from "../core/core.module";

import {DashboardComponent} from "./dashboard.component";
import {DashboardService} from "./dashboard.service";


@NgModule({
    imports: [
        CoreModule,
    ],
    declarations: [
        DashboardComponent,
    ],
    providers: [
        DashboardService,
    ],
    exports: [
    ]
})
export class DashboardModule {}
