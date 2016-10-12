import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';

import {CoreModule} from "../core/core.module";

import {TimersComponent} from "./timers.component";
import {TimerComponent} from "./timer.component";

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
