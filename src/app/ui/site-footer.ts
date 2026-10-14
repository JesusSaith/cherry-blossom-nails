import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SakuraTree } from './sakura-tree';

export interface Hours {
  days: string;
  time: string;
}

/** Footer compacto en dos columnas: marca y redes a la izquierda, enlaces a la derecha. */
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
        <div class="socials">
          <a class="social" [href]="instagram()" target="_blank" rel="noopener" aria-label="Instagram de Cherry Blossom">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="1.8" />
              <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8" />
              <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" />
            </svg>
          </a>
          @if (facebook()) {
            <a class="social" [href]="facebook()" target="_blank" rel="noopener" aria-label="Facebook de Cherry Blossom">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.5V21z"
                />
              </svg>
            </a>
          }
          @if (whatsapp()) {
            <a class="social" [href]="whatsapp()" target="_blank" rel="noopener" aria-label="WhatsApp de Cherry Blossom">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2s.2-1.1.2-1.2-.2-.2-.5-.3z"
                />
              </svg>
            </a>
          }
        </div>
      </div>
      <div class="right">
        <nav aria-label="Enlaces del pie">
          <a href="#servicios">Servicios</a>
        </nav>
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
      background: #4a3036;
      color: #fff;
    }

    .wave {
      position: absolute;
      top: -1px;
      left: 0;
      width: 100%;
      height: 28px;
      fill: var(--blush, #faf5f2);
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
      font-family: Outfit, sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      line-height: 1.1;
    }

    .socials {
      display: flex;
      gap: 0.6rem;
      margin-top: 0.9rem;
    }

    .social {
      display: inline-grid;
      place-items: center;
      width: 42px;
      height: 42px;
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transition: background 0.3s, color 0.3s;
    }

    .social:hover,
    .social:focus-visible {
      background: #fff;
      color: #4a3036;
    }

    .right {
      display: grid;
      gap: 0.75rem;
      justify-items: end;
    }

    nav,
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
      text-decoration: none;
    }

    nav a {
      font-weight: 500;
    }

    nav a:hover {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    .hours li {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.9rem;
    }


    mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

    .social svg {
      width: 20px;
      height: 20px;
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

      .socials {
        justify-content: center;
      }

      nav,
      .hours {
        justify-content: center;
      }
    }
  `,
})
export class SiteFooter {
  readonly instagram = input.required<string>();
  readonly facebook = input('');
  readonly whatsapp = input('');
  /** Vacío oculta el horario. */
  readonly hours = input<Hours[]>([]);
}
