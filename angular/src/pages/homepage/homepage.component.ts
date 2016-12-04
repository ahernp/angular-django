import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'ad-homepage',
    template: `
        <div id="homepage-content">
            <h1 id="personal-website-of-paul-ahern">Personal Website of Paul Ahern</h1>

            <p>
                Here you will find a <a routerLink="/blog/" title="Blog">Blog</a>,
                some Application <a routerLink="/page/applications/" title="Application Guides">Guides</a>,
                a catalog for my <a routerLink="/sitemap/library/" title="Library">Library</a>
                and a <a routerLink="/page/gallery/" title="Gallery">Gallery</a> of photographs.
            </p>

            <p>See <a routerLink="/page/rooska/" title="Rooska">Rooska</a> for maps and photographs of my mountain.</p>

            <div class="column-left">
                <ad-markdown-content *ngIf="content" [content]="content"></ad-markdown-content>
            </div>

            <div class="column-right">
                <ad-homepage-navigation></ad-homepage-navigation>
            </div>

            <div style="clear:both"></div>
        </div>
    `,
    providers: []
})
export class HomepageComponent implements OnInit {
    @Input() content: string;

    ngOnInit(): void {
    }
}
