import { Component, input } from '@angular/core';

/** Franja que se desplaza sola. La copia duplicada se oculta a lectores de pantalla. */
@Component({
  selector: 'app-marquee',
  template: `
    <div class="track">
      @for (copy of [0, 1]; track copy) {
        <ul [attr.aria-hidden]="copy === 1 ? 'true' : null">
          @for (item of items(); track item) {
            <li>{{ item }}<span class="flor" aria-hidden="true">✿</span></li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      overflow: hidden;
      margin: 3rem 0;
      padding: 0.9rem 0;
      background: linear-gradient(90deg, #c45378, #8d4d63);
      color: #fff;
      transform: rotate(-1.5deg);
    }

    .track {
      display: flex;
      width: max-content;
      animation: scroll 28s linear infinite;
    }

    :host(:hover) .track {
      animation-play-state: paused;
    }

    ul {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: center;
      white-space: nowrap;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.6rem;
      font-style: italic;
      font-weight: 600;
    }

    .flor {
      margin: 0 1.5rem;
      color: #f7c3d4;
      font-style: normal;
    }

    @keyframes scroll {
      to {
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .track {
        animation: none;
      }
    }
  `,
})
export class Marquee {
  readonly items = input.required<string[]>();
}
