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
    @for (service of services(); track service.title; let i = $index) {
      <article appTilt>
        <span class="num" aria-hidden="true">0{{ i + 1 }}</span>
        <mat-icon class="icon">{{ service.icon }}</mat-icon>
        <h3>{{ service.title }}</h3>
        <span class="line" aria-hidden="true"></span>
        <p>{{ service.text }}</p>
        @if (whatsapp()) {
          <a
            class="ask"
            [href]="waLink(service.title)"
            target="_blank"
            rel="noopener"
            [attr.aria-label]="'Consultar ' + service.title + ' por WhatsApp'"
          >
            Consultar
          </a>
        }
      </article>
    }
  `,
  styles: `
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
      gap: 1.5rem;
    }

    /* Tarjeta en arco de vidrio esmerilado sobre la foto del salón. */
    article {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 3.25rem 1.5rem 2.25rem;
      text-align: center;
      background: rgba(255, 255, 255, 0.62);
      backdrop-filter: blur(14px) saturate(1.2);
      border: 1px solid rgba(255, 255, 255, 0.85);
      border-radius: 200px 200px 1rem 1rem;
      box-shadow: 0 20px 40px rgba(110, 70, 80, 0.12);
      transition: transform 0.4s, box-shadow 0.4s, border-color 0.4s;
    }

    article:hover {
      transform: translateY(-6px);
      border-color: rgba(176, 144, 106, 0.7);
      box-shadow: 0 28px 50px rgba(110, 70, 80, 0.18);
    }

    .num {
      margin-bottom: 1rem;
      color: var(--gold);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.3em;
    }

    .icon {
      display: grid;
      place-items: center;
      width: 64px;
      height: 64px;
      margin-bottom: 1.25rem;
      background: rgba(254, 219, 231, 0.7);
      color: var(--accent);
      font-size: 1.7rem;
      border-radius: 50%;
    }

    h3 {
      margin: 0;
      color: var(--olive);
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.9rem;
      font-weight: 500;
    }

    .line {
      width: 32px;
      height: 1px;
      margin: 0.85rem 0;
      background: var(--gold);
    }

    p {
      margin: 0 0 1.5rem;
      color: var(--ink);
      font-size: 0.95rem;
      line-height: 1.6;
    }

    /* Botón "Consultar" que abre WhatsApp con el servicio ya escrito. */
    .ask {
      margin-top: auto;
      padding: 0.7rem 1.6rem;
      background: var(--accent);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      text-decoration: none;
      border-radius: 2px;
      transition: background 0.3s;
    }

    .ask:hover,
    .ask:focus-visible {
      background: var(--ink);
      color: #fff;
    }

    .ask:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
      article {
        transition: none;
      }
    }
  `,
})
export class ServiceGrid {
  readonly services = input.required<Service[]>();
  /** Número de WhatsApp con lada; vacío oculta el botón "Consultar". */
  readonly whatsapp = input('');

  protected waLink(service: string): string {
    const text = `Hola Cherry Blossom, quiero consultar por el servicio de ${service} 🌸`;
    return `https://wa.me/${this.whatsapp()}?text=${encodeURIComponent(text)}`;
  }
}
