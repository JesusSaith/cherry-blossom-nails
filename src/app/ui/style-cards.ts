import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Tilt } from './tilt';

export interface NailStyle {
  name: string;
  hint: string;
  src: string;
  alt: string;
}

/** Banda horizontal de estilos para inspirar antes de escribir. */
@Component({
  selector: 'app-style-cards',
  imports: [NgOptimizedImage, MatIcon, Tilt],
  template: `
    <ul tabindex="0" aria-label="Estilos">
      @for (s of items(); track s.name) {
        <li appTilt>
          <img [ngSrc]="s.src" width="768" height="1024" [alt]="s.alt" />
          <div class="info">
            <h3>{{ s.name }}</h3>
            <p>{{ s.hint }}</p>
            <a [href]="link()" target="_blank" rel="noopener" [attr.aria-label]="'Quiero el estilo ' + s.name">
              Lo quiero<mat-icon>arrow_forward</mat-icon>
            </a>
          </div>
        </li>
      }
    </ul>
  `,
  styles: `
    ul {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: minmax(220px, 1fr);
      gap: 1.25rem;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      margin: 0;
      padding: 0.25rem 0.25rem 1.25rem;
      list-style: none;
    }

    ul:focus-visible {
      outline: 2px solid #c45378;
      outline-offset: 4px;
      border-radius: 1rem;
    }

    li {
      position: relative;
      overflow: hidden;
      scroll-snap-align: start;
      border-radius: 1.5rem;
      box-shadow: 0 14px 30px rgba(196, 83, 120, 0.18);
      transition: transform 0.3s;
    }

    img {
      display: block;
      width: 100%;
      height: 320px;
      object-fit: cover;
      transition: transform 0.5s;
    }

    li:hover img {
      transform: scale(1.06);
    }

    .info {
      position: absolute;
      inset: auto 0 0;
      padding: 2.5rem 1rem 1rem;
      background: linear-gradient(transparent, rgba(141, 77, 99, 0.95) 45%);
      color: #fff;
    }

    h3 {
      margin: 0;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
    }

    p {
      margin: 0 0 0.4rem;
      font-size: 0.9rem;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      color: #fff;
      font-weight: 600;
    }

    a:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 2px;
    }

    mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    @media (max-width: 720px) {
      ul {
        grid-auto-columns: 70vw;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      img {
        transition: none;
      }
    }
  `,
})
export class StyleCards {
  readonly items = input.required<NailStyle[]>();
  readonly link = input.required<string>();
}
