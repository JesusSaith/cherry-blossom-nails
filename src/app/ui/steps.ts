import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

export interface Step {
  icon: string;
  title: string;
  text: string;
}

/** Pasos en tarjetas con número grande y conector. */
@Component({
  selector: 'app-steps',
  imports: [MatIcon],
  template: `
    <ol>
      @for (step of steps(); track step.title; let i = $index) {
        <li>
          <span class="big" aria-hidden="true">0{{ i + 1 }}</span>
          <mat-icon class="icon">{{ step.icon }}</mat-icon>
          <span class="num">Paso {{ i + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
        </li>
      }
    </ol>
  `,
  styles: `
    ol {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
      gap: 2rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    li {
      position: relative;
      padding: 2rem 1.5rem 1.75rem;
      background: var(--surface);
      border: 1px solid var(--petal);
      border-radius: 1.5rem;
      box-shadow: 0 14px 30px rgba(196, 83, 120, 0.12);
      transition: transform 0.35s;
    }

    li:hover {
      transform: translateY(-6px);
    }

    li:not(:last-child)::after {
      content: '';
      position: absolute;
      top: 50%;
      right: -2rem;
      width: 2rem;
      border-top: 2px dashed #c45378;
    }

    .big {
      position: absolute;
      top: 0.5rem;
      right: 1rem;
      color: var(--blush);
      font-family: 'Cormorant Garamond', serif;
      font-size: 5rem;
      font-weight: 700;
      line-height: 1;
    }

    .icon {
      position: relative;
      display: grid;
      place-items: center;
      width: 60px;
      height: 60px;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #e48aaa, #c45378);
      color: #fff;
      border-radius: 150% 0 150% 0;
    }

    .num {
      position: relative;
      color: var(--accent);
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    h3 {
      position: relative;
      margin: 0.2rem 0;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.7rem;
    }

    p {
      position: relative;
      margin: 0;
    }

    @media (max-width: 720px) {
      li:not(:last-child)::after {
        display: none;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      li {
        transition: none;
      }
    }
  `,
})
export class Steps {
  readonly steps = input.required<Step[]>();
}
