import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

/** Tarjeta de contacto con íconos y CTA. */
@Component({
  selector: 'app-contact-card',
  imports: [MatIcon],
  template: `
    <ul>
      <li>
        <mat-icon>photo_camera</mat-icon>
        <div>
          <strong>Instagram</strong>
          <a [href]="instagram()" target="_blank" rel="noopener">&#64;nailstudio_cherryblossom</a>
        </div>
      </li>
      @if (phone()) {
        <li>
          <mat-icon>call</mat-icon>
          <div>
            <strong>Teléfono</strong>
            <a [href]="'tel:' + phone()">{{ phone() }}</a>
          </div>
        </li>
      }
      <li>
        <mat-icon>location_on</mat-icon>
        <div>
          <strong>Ubicación</strong>
          <span>Mira el mapa para llegar</span>
        </div>
      </li>
    </ul>
    <ng-content />
  `,
  styles: `
    :host {
      display: grid;
      align-content: center;
      gap: 1.5rem;
      padding: 2rem;
      background: var(--surface);
      border: 1px solid var(--petal);
      border-radius: 1.5rem;
      box-shadow: 0 18px 40px rgba(196, 83, 120, 0.12);
    }

    ul {
      display: grid;
      gap: 1.25rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      gap: 0.9rem;
      align-items: center;
    }

    li > mat-icon {
      display: grid;
      place-items: center;
      flex: none;
      width: 48px;
      height: 48px;
      background: var(--blush);
      color: var(--accent);
      border-radius: 50%;
    }

    strong {
      display: block;
      font-size: 0.8rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    a {
      color: var(--accent);
      font-weight: 600;
    }
  `,
})
export class ContactCard {
  readonly instagram = input.required<string>();
  readonly phone = input('');
}
