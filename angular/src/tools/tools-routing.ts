import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ToolsComponent} from "./tools.component";

import {CardgenComponent} from "./cardgen.component";
import {CompareComponent} from "./compare.component";
import {DeduplicateComponent} from "./deduplicate.component";
import {MatchComponent} from "./match.component";

const toolsRoutes: Routes = [
    {
        path: 'tools',
        component: ToolsComponent,
        children: [
            {
                path: 'cardgen',
                component: CardgenComponent,
            },
            {
                path: 'compare',
                component: CompareComponent,
            },
            {
                path: 'deduplicate',
                component: DeduplicateComponent,
            },
            {
                path: 'match',
                component: MatchComponent,
            },
        ]
    }
];

export const toolsRouting: ModuleWithProviders = RouterModule.forChild(toolsRoutes);
