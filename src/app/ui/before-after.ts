import { Component, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/** Comparador antes/después con control deslizante. */
@Component({
  selector: 'app-before-after',
  imports: [NgOptimizedImage],
  template: `
    <div class="frame" [style.--pos.%]="pos()">
      <img [ngSrc]="before()" width="768" height="1024" alt="Uñas antes del servicio" />
      <img class="after" [ngSrc]="after()" width="768" height="1024" alt="Uñas después del servicio" />
      <span class="label left" aria-hidden="true">Antes</span>
      <span class="label right" aria-hidden="true">Después</span>
      <span class="handle" aria-hidden="true"></span>
      <input
        type="range"
        min="0"
        max="100"
        [value]="pos()"
        (input)="pos.set(+$any($event.target).value)"
        aria-label="Comparar antes y después"
      />
    </div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 420px;
      margin: 0 auto;
    }

    .frame {
      position: relative;
      overflow: hidden;
      border: 6px solid var(--surface);
      border-radius: 2rem;
      box-shadow: 0 18px 40px rgba(196, 83, 120, 0.2);
    }

    img {
      display: block;
      width: 100%;
      height: 480px;
      object-fit: cover;
    }

    .after {
      position: absolute;
      inset: 0;
      clip-path: inset(0 0 0 var(--pos));
    }

    .handle {
      position: absolute;
      top: 0;
      bottom: 0;
      left: var(--pos);
      width: 3px;
      background: var(--surface);
      transform: translateX(-50%);
      pointer-events: none;
    }

    .handle::after {
      content: '⇆';
      position: absolute;
      top: 50%;
      left: 50%;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      background: #c45378;
      color: #fff;
      border: 3px solid var(--surface);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .label {
      position: absolute;
      top: 1rem;
      padding: 0.25rem 0.8rem;
      background: rgba(141, 77, 99, 0.85);
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      border-radius: 999px;
    }

    .left {
      left: 1rem;
    }

    .right {
      right: 1rem;
    }

    input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      cursor: ew-resize;
    }

    .frame:has(input:focus-visible) {
      outline: 3px solid #c45378;
      outline-offset: 3px;
    }

    @media (max-width: 520px) {
      img {
        height: 380px;
      }
    }
  `,
})
export class BeforeAfter {
  readonly before = input.required<string>();
  readonly after = input.required<string>();
  protected readonly pos = signal(50);
}
