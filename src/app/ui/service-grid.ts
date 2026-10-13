import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Tilt } from './tilt';

export interface Service {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-service-grid',
  imports: [MatIcon, Tilt],
  template: `
    @for (service of services(); track service.title) {
      <article appTilt>
        <mat-icon class="icon">{{ service.icon }}</mat-icon>
        <h3>{{ service.title }}</h3>
        <p>{{ service.text }}</p>
      </article>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
      gap: 1.5rem;
    }

    article {
      position: relative;
      overflow: hidden;
      padding: 2.25rem 1.5rem 2rem;
      background: var(--surface);
      border: 1px solid var(--petal);
      border-radius: 1.5rem;
      box-shadow: 0 14px 30px rgba(196, 83, 120, 0.12);
      transition: transform 0.35s, box-shadow 0.35s;
    }

    /* Pétalo decorativo en la esquina. */
    article::after {
      content: '';
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      background: var(--blush);
      border-radius: 150% 0 150% 0;
      transition: transform 0.5s;
    }

    article:hover {
      transform: translateY(-6px);
      box-shadow: 0 22px 44px rgba(196, 83, 120, 0.22);
    }

    article:hover .icon {
      animation: wiggle 0.6s ease-in-out;
    }

    @keyframes wiggle {
      25% {
        transform: rotate(-12deg);
      }
      50% {
        transform: rotate(10deg);
      }
      75% {
        transform: rotate(-6deg);
      }
    }

    article:hover::after {
      transform: rotate(45deg) scale(1.25);
    }

    .icon {
      position: relative;
      z-index: 1;
      display: grid;
      place-items: center;
      width: 72px;
      height: 72px;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #f7c3d4, #c45378);
      color: #fff;
      font-size: 2.2rem;
      border-radius: 50%;
      box-shadow: 0 10px 22px rgba(196, 83, 120, 0.3);
    }

    h3,
    p {
      position: relative;
      z-index: 1;
    }

    h3 {
      margin: 0 0 0.35rem;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem;
    }

    p {
      margin: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      article,
      article::after {
        transition: none;
      }

      article:hover .icon {
        animation: none;
      }
    }
  `,
})
export class ServiceGrid {
  readonly services = input.required<Service[]>();
}
