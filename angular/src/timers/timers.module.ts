import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {CoreModule} from "../core/core.module";

import {TimerComponent} from "./timer.component";
import {TimersComponent} from "./timers.component";

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
    ],
    declarations: [
        TimersComponent,
        TimerComponent,
    ],
    providers: [
    ],
    exports: [
    ]
})
export class TimersModule {}
