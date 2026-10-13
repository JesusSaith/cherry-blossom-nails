import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SakuraTree } from './sakura-tree';

export interface Hours {
  days: string;
  time: string;
}

/** Footer compacto en dos columnas: marca a la izquierda, enlaces y visita a la derecha. */
@Component({
  selector: 'app-site-footer',
  imports: [MatIcon, SakuraTree],
  template: `
    <svg class="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 40 C240 90 480 0 720 30 C960 60 1200 10 1440 40 V80 H0 Z" />
    </svg>
    <app-sakura-tree class="tree" />
    <div class="cols">
      <div class="about">
        <p class="brand">Cherry Blossom</p>
        <p>El arte está en ti. Manicure, pedicure y diseño a mano.</p>
        <a class="social" [href]="instagram()" target="_blank" rel="noopener" aria-label="Instagram de Cherry Blossom">
          <mat-icon>photo_camera</mat-icon>
        </a>
      </div>
      <div class="right">
        <nav aria-label="Enlaces del pie">
          <a href="#nosotros">Nosotras</a>
          <a href="#servicios">Servicios</a>
          <a href="#precios">Precios</a>
          <a href="#trabajos">Trabajos</a>
          <a href="#faq">Preguntas</a>
        </nav>
        <div class="visit">
          <a [href]="mapsLink()" target="_blank" rel="noopener"><mat-icon>location_on</mat-icon>Cómo llegar</a>
          <a [href]="instagram()" target="_blank" rel="noopener"><mat-icon>chat</mat-icon>&#64;nailstudio_cherryblossom</a>
        </div>
        @if (hours().length) {
          <ul class="hours" aria-label="Horario">
            @for (h of hours(); track h.days) {
              <li><mat-icon>schedule</mat-icon>{{ h.days }}: {{ h.time }}</li>
            }
          </ul>
        }
      </div>
    </div>
    <p class="copy">© Cherry Blossom Nail Studio</p>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      overflow: hidden;
      margin-top: 3rem;
      padding: 2.25rem 1.25rem 0.75rem;
      background: #8d4d63;
      color: #fff;
    }

    .wave {
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 28px;
      fill: var(--blush, #fdeef4);
      transform: scaleY(-1);
    }

    .tree {
      position: absolute;
      left: -60px;
      bottom: -50px;
      width: 200px;
      opacity: 0.15;
      pointer-events: none;
    }

    .cols {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 1.25rem 2.5rem;
      width: min(100%, 1000px);
      margin: 0 auto;
    }

    .brand {
      margin: 0;
      font-family: 'Great Vibes', cursive;
      font-size: 2.1rem;
      line-height: 1.1;
    }

    .about p:not(.brand) {
      margin: 0 0 0.6rem;
    }

    .social {
      display: inline-grid;
      place-items: center;
      width: 38px;
      height: 38px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transition: background 0.3s, color 0.3s;
    }

    .social:hover,
    .social:focus-visible {
      background: #fff;
      color: #8d4d63;
    }

    .right {
      display: grid;
      gap: 0.75rem;
      justify-items: end;
    }

    nav,
    .visit,
    .hours {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 0.4rem 1.1rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    a {
      color: #fff;
    }

    nav a {
      font-weight: 500;
    }

    nav a:hover,
    .visit a:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .visit a,
    .hours li {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.9rem;
    }

    .visit a {
      padding: 0.3rem 0.8rem;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 999px;
    }

    mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    .social mat-icon {
      width: 22px;
      height: 22px;
      font-size: 22px;
    }

    a:focus-visible {
      outline: 2px solid #fff;
      outline-offset: 3px;
    }

    .copy {
      position: relative;
      margin: 1.25rem 0 0;
      padding-top: 0.75rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      text-align: center;
      font-size: 0.8rem;
    }

    @media (max-width: 640px) {
      .cols {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .right {
        justify-items: center;
      }

      nav,
      .visit,
      .hours {
        justify-content: center;
      }
    }
  `,
})
export class SiteFooter {
  readonly instagram = input.required<string>();
  readonly mapsLink = input.required<string>();
  /** Vacío oculta el horario. */
  readonly hours = input<Hours[]>([]);
}
