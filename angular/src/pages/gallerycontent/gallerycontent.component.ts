import {Component, Input} from '@angular/core';

import {Gallery} from "./gallery";

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
                style="top: 0; right: 0; padding-top: 0; font-size: 35px;">&times;</span>
            <span (click)="previousImage()" class="lightbox-control lightbox-previous-next"
                style="border-radius: 0 3px 3px 0;">&#10094;</span>
            <span (click)="nextImage()" class="lightbox-control lightbox-previous-next"
                style="right: 0; border-radius: 3px 0 0 3px;">&#10095;</span>
            <img [src]="gallery.images[currentIndex].imageUrl" class="lightbox-image">
            <p style="text-align: center;">
                {{gallery.images[currentIndex].title}}
                ({{currentIndex + 1}} of {{gallery.images.length}})
            </p>
        </div>
        `,
    styles: [`
        img.thumbnail {
            margin: 2px;
        }
        #lightbox {
            position: fixed;
            z-index: 10;
            padding: 10px 0;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: #fff;
        }
        .lightbox-control {
            position: absolute;
            cursor: pointer;
            color: #046;
            font-weight: bold;
            padding: 25px;
        }
        .lightbox-previous-next {
            top: 50%;
            width: auto;
            margin-top: -50px;
            font-size: 20px;
            transition: 0.6s ease;
        }
        .lightbox-image {
            display: block;
            margin-left: auto;
            margin-right: auto;
            max-height:90%;
            max-width:90%;
            border: solid #ccc 1px;
        }
    `],
    providers: []
})
export class GalleryContentComponent {
    @Input()
    set content(content: string) {
        this.gallery = JSON.parse(content);
    }

    currentIndex: number;
    gallery: Gallery;
    showLightboxFlag: boolean = false;

    closeLightbox(): void {
        this.showLightboxFlag = false;
    }

    nextImage(): void {
        if (this.currentIndex == (this.gallery.images.length - 1))
            this.currentIndex = 0;
        else
            this.currentIndex++;
    }

    previousImage(): void {
        if (this.currentIndex > 0)
            this.currentIndex--;
        else
            this.currentIndex = this.gallery.images.length - 1;
    }

    showImage(index: number): void {
        this.currentIndex = index;
        this.showLightboxFlag = true;
    }
}
