import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export interface Testimonial {
  /** Captura del comentario en /public. */
  src: string;
  /** Texto del comentario, para lectores de pantalla. */
  alt: string;
  width: number;
  height: number;
}

/** Carrusel deslizable de capturas de comentarios de Instagram. */
@Component({
  selector: 'app-testimonials',
  imports: [NgOptimizedImage],
  template: `
    <ul tabindex="0" aria-label="Comentarios de clientas">
      @for (t of items(); track t.src) {
        <li><img [ngSrc]="t.src" [width]="t.width" [height]="t.height" [alt]="t.alt" /></li>
      }
    </ul>
  `,
  styles: `
    ul {
      display: flex;
      gap: 1.25rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      margin: 0;
      padding: 0.5rem 0.25rem 1.5rem;
      list-style: none;
    }

    ul:focus-visible {
      outline: 2px solid #c45378;
      outline-offset: 4px;
      border-radius: 1rem;
    }

    li {
      flex: none;
      width: min(80vw, 300px);
      scroll-snap-align: center;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      border: 6px solid var(--surface);
      border-radius: 1.5rem;
      box-shadow: 0 14px 30px rgba(196, 83, 120, 0.18);
    }
  `,
})
export class Testimonials {
  readonly items = input.required<Testimonial[]>();
}
