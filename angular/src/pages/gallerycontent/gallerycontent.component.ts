import {Component, Input} from '@angular/core';

import {Gallery, Image} from "./gallery";

@Component({
    selector: 'ad-gallerycontent',
    template: `
        <h2 *ngIf="gallery.heading">{{gallery.heading}}</h2>
        <p *ngIf="gallery">
            <img *ngFor="let image of gallery.images; let i = index" (click)="showImage(i)"
                class="thumbnail" src="{{image.thumbnailUrl}}" alt="{{image.title}}">
        <p>
        <div *ngIf="showLightboxFlag" id="lightbox">
            <span (click)="closeLightbox()" class="lightbox-control"
                style="top: 10px; right: 25px; font-size: 35px; ">&times;</span>
            <span (click)="previousImage()" class="lightbox-control lightbox-previous-next"
                style="border-radius: 0 3px 3px 0;">&#10094;</span>
            <span (click)="nextImage()" class="lightbox-control lightbox-previous-next"
                style="right: 0; border-radius: 3px 0 0 3px;">&#10095;</span>
            <img *ngIf="showImageFlag" src="{{gallery.images[currentIndex].imageUrl}}"
                style="display: block; margin-left: auto; margin-right: auto; max-height:90%; max-width:90%">
            <p style="text-align: center; color: white;">
                {{gallery.images[currentIndex].title}}
                ({{currentIndex + 1}} of {{gallery.images.length}})
            </p>
        </div>
        `,
    providers: []
})
export class GalleryContentComponent {
    @Input()
    set content(content: string) {
        this.gallery = JSON.parse(content);
    }
    gallery: Gallery;
    currentIndex: number;
    showLightboxFlag: boolean = false;
    showImageFlag: boolean = true;

    showImage(index: number): void {
        this.currentIndex = index;
        this.showLightboxFlag = true;
    }

    closeLightbox(): void {
        this.showLightboxFlag = false;
    }

    previousImage(): void {
        this.showImageFlag = false;
        if (this.currentIndex > 0)
            this.currentIndex--;
        else
            this.currentIndex = this.gallery.images.length - 1;
        this.showImageFlag = true;
    }

    nextImage(): void {
        this.showImageFlag = false;
        if (this.currentIndex == (this.gallery.images.length - 1))
            this.currentIndex = 0;
        else
            this.currentIndex++;
        this.showImageFlag = true;
    }
}
