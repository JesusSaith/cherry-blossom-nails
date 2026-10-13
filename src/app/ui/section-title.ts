import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-section-title',
  imports: [MatIcon],
  template: `
    <p class="kicker">{{ kicker() }}</p>
    <h2>{{ title() }} @if (accent()) {<em>{{ accent() }}</em>}</h2>
    <span class="divider" aria-hidden="true">
      <mat-icon>local_florist</mat-icon>
    </span>
    @if (subtitle()) {
      <p class="sub">{{ subtitle() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
      margin-bottom: 2rem;
      text-align: center;
    }

    .kicker {
      margin: 0;
      color: var(--accent);
      font-family: 'Great Vibes', cursive;
      font-size: 2rem;
      line-height: 1.1;
    }

    h2 {
      margin: 0 0 0.4rem;
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.4rem, 5vw, 3.2rem);
      line-height: 1.05;
    }

    em {
      color: var(--accent);
    }

    .divider {
      position: relative;
      margin-top: 0.25rem;
      display: inline-block;
      color: var(--accent);
      line-height: 1;
    }

    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 60px;
      height: 2px;
      background: var(--petal);
    }

    .divider::before {
      right: calc(100% + 10px);
    }

    .divider::after {
      left: calc(100% + 10px);
    }

    .sub {
      max-width: 34rem;
      margin: 0.75rem auto 0;
    }
  `,
})
export class SectionTitle {
  readonly kicker = input.required<string>();
  readonly title = input('');
  /** Palabra final en cursiva rosa. */
  readonly accent = input('');
  readonly subtitle = input('');
}
