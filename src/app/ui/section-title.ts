import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  template: `
    @if (kicker()) {
      <p class="kicker">{{ kicker() }}</p>
    }
    <h2>{{ title() }} @if (accent()) {<em>{{ accent() }}</em>}</h2>
    <span class="divider" aria-hidden="true"></span>
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
      font-family: Outfit, sans-serif;
      font-size: 0.78rem;
      font-weight: 500;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      line-height: 1.1;
    }

    h2 {
      margin: 0 0 0.4rem;
      font-weight: 400;
      color: var(--olive);
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(2.4rem, 5vw, 3.2rem);
      line-height: 1.05;
    }

    em {
      color: var(--olive);
    }

    .divider {
      display: block;
      width: 48px;
      height: 1px;
      margin: 1.1rem auto 0;
      background: var(--gold);
    }

    .sub {
      max-width: 34rem;
      margin: 0.75rem auto 0;
    }
  `,
})
export class SectionTitle {
  readonly kicker = input('');
  readonly title = input('');
  /** Palabra final en cursiva. */
  readonly accent = input('');
  readonly subtitle = input('');
}
