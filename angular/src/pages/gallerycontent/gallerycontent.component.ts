import {Component, Input} from '@angular/core';

import {Gallery} from "./gallery";

@Component({
    selector: 'ad-gallerycontent',
    template: `
        <h2 *ngIf="gallery.heading">{{gallery.heading}}</h2>
        <p *ngIf="gallery">
            <template ngFor let-image [ngForOf]="gallery.images">
                <a href="{{image.imageUrl}}" title="{{image.title}}">
                    <img src="{{image.thumbnailUrl}}" alt="{{image.title}}">
                </a>
            </template>
        <p>
        `,
    providers: []
})
export class GalleryContentComponent {
    @Input()
    set content(content: string) {
        this.gallery = JSON.parse(content);
    }
    gallery: Gallery;
}
