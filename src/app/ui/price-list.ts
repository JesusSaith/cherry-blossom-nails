import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface PriceItem {
  name: string;
  /** Vacío muestra "Consultar". */
  price?: string;
}

/** Carta de precios estilo menú, con marco punteado. */
@Component({
  selector: 'app-price-list',
  imports: [MatIcon],
  template: `
    <mat-icon class="flower">local_florist</mat-icon>
    <ul>
      @for (item of items(); track item.name) {
        <li>
          <span class="name">{{ item.name }}</span>
          <span class="dots" aria-hidden="true"></span>
          <strong>{{ item.price || 'Consultar' }}</strong>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      position: relative;
      display: block;
      padding: 3rem 2.5rem 2.5rem;
      background: var(--surface);
      border-radius: 2rem;
      box-shadow: 0 18px 40px rgba(196, 83, 120, 0.15);
    }

    :host::before {
      content: '';
      position: absolute;
      inset: 12px;
      border: 1px dashed var(--petal);
      border-radius: 1.5rem;
      pointer-events: none;
    }

    .flower {
      position: absolute;
      top: -24px;
      left: 50%;
      transform: translateX(-50%);
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      background: #c45378;
      color: #fff;
      border-radius: 50%;
      box-shadow: 0 8px 18px rgba(196, 83, 120, 0.35);
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
      column-gap: 3rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      padding: 0.8rem 0;
    }

    .name {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem;
      font-weight: 600;
    }

    .name::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      margin-right: 0.6rem;
      background: #e48aaa;
      border-radius: 150% 0 150% 0;
    }

    .dots {
      flex: 1;
      border-bottom: 2px dotted var(--petal);
    }

    strong {
      color: var(--accent);
    }

    @media (max-width: 520px) {
      :host {
        padding: 2.5rem 1.25rem 1.5rem;
      }

      .name {
        font-size: 1.15rem;
      }
    }
  `,
})
export class PriceList {
  readonly items = input.required<PriceItem[]>();
}
