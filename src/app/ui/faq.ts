import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Acordeón nativo (<details>) con número, ícono y apertura suave. */
@Component({
  selector: 'app-faq',
  imports: [MatIcon],
  template: `
    @for (item of items(); track item.question; let i = $index; let first = $first) {
      <details [open]="first">
        <summary>
          <span class="n" aria-hidden="true">0{{ i + 1 }}</span>
          <span class="q">{{ item.question }}</span>
          <mat-icon class="toggle">add</mat-icon>
        </summary>
        <p>{{ item.answer }}</p>
      </details>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: 0.85rem;
      interpolate-size: allow-keywords;
    }

    details {
      background: var(--surface);
      border: 1px solid var(--petal);
      border-radius: 1.25rem;
      box-shadow: 0 8px 20px rgba(196, 83, 120, 0.08);
      transition: box-shadow 0.3s, border-color 0.3s;
    }

    details[open] {
      border-color: var(--accent);
      box-shadow: 0 16px 34px rgba(196, 83, 120, 0.18);
    }

    details::details-content {
      block-size: 0;
      overflow: hidden;
      transition: block-size 0.35s ease, content-visibility 0.35s allow-discrete;
    }

    details[open]::details-content {
      block-size: auto;
    }

    summary {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      cursor: pointer;
      list-style: none;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary:focus-visible {
      outline: 2px solid #c45378;
      outline-offset: 2px;
      border-radius: 1.25rem;
    }

    .n {
      display: grid;
      place-items: center;
      flex: none;
      width: 40px;
      height: 40px;
      background: var(--blush);
      color: var(--accent);
      font-weight: 700;
      border-radius: 150% 0 150% 0;
      transition: background 0.3s, color 0.3s;
    }

    details[open] .n {
      background: #c45378;
      color: #fff;
    }

    .q {
      flex: 1;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.35rem;
      font-weight: 600;
    }

    .toggle {
      flex: none;
      color: var(--accent);
      transition: transform 0.3s;
    }

    details[open] .toggle {
      transform: rotate(45deg);
    }

    p {
      margin: 0;
      padding: 0 1.25rem 1.25rem 4.75rem;
    }

    @media (max-width: 520px) {
      summary {
        gap: 0.75rem;
        padding: 0.9rem 1rem;
      }

      p {
        padding: 0 1rem 1rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      details::details-content,
      .toggle {
        transition: none;
      }
    }
  `,
})
export class Faq {
  readonly items = input.required<FaqItem[]>();
}
