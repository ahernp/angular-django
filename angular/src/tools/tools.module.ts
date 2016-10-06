import {NgModule} from '@angular/core';
import {ToolsComponent} from './tools.component';
import {toolsRouting} from './tools-routing';
import {MatchComponent} from "./match.component";
import {DeduplicateComponent} from "./deduplicate.component";
import {CompareComponent} from "./compare.component";
import {CardgenComponent} from "./cardgen.component";
import {CoreModule} from "../core/core.module";

@NgModule({
    imports: [
        CoreModule,
        toolsRouting
    ],
    declarations: [
        ToolsComponent,
        CardgenComponent,
        CompareComponent,
        DeduplicateComponent,
        MatchComponent,
    ],
    providers: [

    ]
})

export class ToolsModule {}
