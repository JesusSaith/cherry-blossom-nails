import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-gallery',
  imports: [NgOptimizedImage],
  template: `
    @for (item of items(); track item.src) {
      <figure>
        <img [ngSrc]="item.src" [width]="item.width" [height]="item.height" [alt]="item.alt" />
        <figcaption>{{ item.caption }}</figcaption>
      </figure>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0.75rem;
    }

    figure {
      position: relative;
      margin: 0;
      overflow: hidden;
      border-radius: 1.25rem;
    }

    img {
      display: block;
      width: 100%;
      height: 340px;
      object-fit: cover;
      object-position: center 30%;
      transition: transform 0.5s ease-in-out;
    }

    figcaption {
      position: absolute;
      inset: auto 0 0;
      padding: 0.75rem;
      background: rgba(141, 77, 99, 0.85);
      color: #fff;
      text-align: center;
      font-weight: 600;
      transform: translateY(100%);
      transition: transform 0.4s ease-in-out;
    }

    figure:hover img {
      transform: scale(1.06);
    }

    figure:hover figcaption {
      transform: translateY(0);
    }

    /* En táctil no hay hover: el pie de foto queda visible. */
    @media (hover: none) {
      figcaption {
        transform: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      img,
      figcaption {
        transition: none;
      }
    }

    @media (max-width: 720px) {
      :host {
        grid-template-columns: 1fr 1fr;
      }

      img {
        height: 260px;
      }
    }
  `,
})
export class Gallery {
  readonly items = input.required<GalleryItem[]>();
}
