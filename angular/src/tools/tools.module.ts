import {NgModule} from '@angular/core';

import {toolsRouting} from './tools-routing';

import {CoreModule} from "../core/core.module";

import {ToolsComponent} from './tools.component';

import {CardgenComponent} from "./cardgen.component";
import {CompareComponent} from "./compare.component";
import {DeduplicateComponent} from "./deduplicate.component";
import {MatchComponent} from "./match.component";
import {ColoursComponent} from "./colours.component";

@NgModule({
    imports: [
        CoreModule,
        toolsRouting,
    ],
    declarations: [
        ToolsComponent,
        CardgenComponent,
        ColoursComponent,
        CompareComponent,
        DeduplicateComponent,
        MatchComponent,
    ],
    providers: [

    ]
})
export class ToolsModule {}
