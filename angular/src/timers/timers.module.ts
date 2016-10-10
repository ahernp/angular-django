import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {CoreModule} from "../core/core.module";

import {TimersComponent} from "./timers.component";

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
    ],
    declarations: [
        TimersComponent,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class TimersModule {}
