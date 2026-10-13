import {
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  input,
  signal,
  computed,
  viewChild,
  ElementRef,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { GalleryItem } from './gallery';
import { MatIcon } from '@angular/material/icon';

/** Carrusel centrado con fotos en arco; avanza solo y se pausa al interactuar. */
@Component({
  selector: 'app-carousel',
  imports: [NgOptimizedImage, MatIcon],
  host: {
    role: 'region',
    'aria-roledescription': 'carrusel',
    'aria-label': 'Trabajos',
    '(mouseenter)': 'hover.set(true)',
    '(mouseleave)': 'hover.set(false)',
    '(focusin)': 'hover.set(true)',
    '(focusout)': 'hover.set(false)',
    '(keydown.arrowleft)': 'prev()',
    '(keydown.arrowright)': 'next()',
  },
  template: `
    <div class="viewport">
      <ul class="track" [style.--i]="index()">
        @for (item of items(); track item.src; let i = $index) {
          <li
            [class.active]="i === index()"
            aria-roledescription="diapositiva"
            [attr.aria-label]="i + 1 + ' de ' + items().length"
            [attr.aria-hidden]="i !== index()"
            (click)="go(i)"
          >
            <img [ngSrc]="item.src" [width]="item.width" [height]="item.height" [alt]="item.alt" />
            <span class="caption">{{ item.caption }}</span>
            @if (i === index()) {
              <button type="button" class="zoom" (click)="open()" [attr.aria-label]="'Ver ' + item.caption + ' en grande'">
                <mat-icon>zoom_in</mat-icon>
              </button>
            }
          </li>
        }
      </ul>
    </div>
    <div class="controls">
      <button type="button" class="arrow" (click)="prev()" aria-label="Trabajo anterior">
        <mat-icon>arrow_back</mat-icon>
      </button>
      @for (item of items(); track item.src; let i = $index) {
        <button
          type="button"
          class="dot"
          [attr.aria-current]="i === index()"
          [attr.aria-label]="'Ver ' + item.caption"
          (click)="go(i)"
        ></button>
      }
      <button type="button" class="arrow" (click)="next()" aria-label="Siguiente trabajo">
        <mat-icon>arrow_forward</mat-icon>
      </button>
      <button
        type="button"
        class="arrow"
        (click)="paused.set(!paused())"
        [attr.aria-label]="paused() ? 'Reproducir carrusel' : 'Pausar carrusel'"
      >
        <mat-icon>{{ paused() ? 'play_arrow' : 'pause' }}</mat-icon>
      </button>
    </div>
    <dialog #box aria-label="Trabajo en grande" (click)="closeOnBackdrop($event)">
      <img [ngSrc]="current().src" [width]="current().width" [height]="current().height" [alt]="current().alt" />
      <div class="lb-bar">
        <button type="button" class="arrow" (click)="prev()" aria-label="Trabajo anterior"><mat-icon>arrow_back</mat-icon></button>
        <span class="lb-cap">{{ current().caption }}</span>
        <button type="button" class="arrow" (click)="next()" aria-label="Siguiente trabajo"><mat-icon>arrow_forward</mat-icon></button>
        <button type="button" class="arrow" (click)="box.close()" aria-label="Cerrar"><mat-icon>close</mat-icon></button>
      </div>
    </dialog>
  `,
  styles: `
    :host {
      --w: 300px;
      --gap: 1.25rem;
      display: block;
    }

    .viewport {
      overflow: hidden;
      padding: 1.5rem 0 2rem;
    }

    .track {
      display: flex;
      gap: var(--gap);
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      transform: translateX(calc(50% - var(--w) / 2 - var(--i) * (var(--w) + var(--gap))));
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }

    li {
      position: relative;
      flex: none;
      width: var(--w);
      cursor: pointer;
      opacity: 0.5;
      transform: scale(0.85);
      transition: transform 0.7s, opacity 0.7s;
    }

    li.active {
      opacity: 1;
      transform: scale(1);
      cursor: default;
    }

    img {
      display: block;
      width: 100%;
      height: 420px;
      object-fit: cover;
      object-position: center 30%;
      border: 6px solid var(--surface);
      border-radius: 200px 200px 1.5rem 1.5rem;
      box-shadow: 0 20px 40px rgba(196, 83, 120, 0.25);
    }

    .caption {
      position: absolute;
      left: 50%;
      bottom: -1rem;
      transform: translateX(-50%);
      padding: 0.4rem 1.2rem;
      background: #c45378;
      color: #fff;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.2rem;
      font-weight: 600;
      white-space: nowrap;
      border-radius: 999px;
    }

    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    button {
      cursor: pointer;
      border: 0;
    }

    button:focus-visible {
      outline: 2px solid #c45378;
      outline-offset: 3px;
    }

    .arrow {
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      background: var(--surface);
      color: var(--accent);
      border: 1px solid var(--petal);
      border-radius: 50%;
      transition: background 0.3s, color 0.3s;
    }

    .arrow:hover {
      background: #c45378;
      color: #fff;
    }

    .dot {
      width: 12px;
      height: 12px;
      padding: 0;
      background: var(--petal);
      border-radius: 150% 0 150% 0;
      transition: width 0.3s, background 0.3s;
    }

    .dot[aria-current='true'] {
      width: 28px;
      background: #c45378;
      border-radius: 999px;
    }

    @media (max-width: 720px) {
      :host {
        --w: 68vw;
      }

      img {
        height: 340px;
      }
    }

    .zoom {
      position: absolute;
      top: 1rem;
      right: 1rem;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      background: var(--surface);
      color: var(--accent);
      border-radius: 50%;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }

    dialog {
      max-width: min(92vw, 520px);
      padding: 0;
      background: transparent;
      border: 0;
    }

    dialog::backdrop {
      background: rgba(37, 19, 26, 0.85);
      backdrop-filter: blur(4px);
    }

    dialog img {
      height: auto;
      max-height: 75vh;
      object-fit: contain;
      border: 0;
      box-shadow: none;
      border-radius: 1.5rem;
    }

    .lb-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    .lb-cap {
      flex: 1;
      color: #fff;
      text-align: center;
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.4rem;
      font-weight: 600;
    }

    @media (prefers-reduced-motion: reduce) {
      .track,
      li {
        transition: none;
      }
    }
  `,
})
export class Carousel {
  readonly items = input.required<GalleryItem[]>();
  protected readonly index = signal(0);
  protected readonly hover = signal(false);
  protected readonly paused = signal(
    typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const id = setInterval(() => {
        if (!this.paused() && !this.hover()) this.next();
      }, 4500);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }

  private readonly box = viewChild.required<ElementRef<HTMLDialogElement>>('box');
  protected readonly current = computed(() => this.items()[this.index()]);

  protected open(): void {
    this.box().nativeElement.showModal();
  }

  protected closeOnBackdrop(e: MouseEvent): void {
    if (e.target === this.box().nativeElement) this.box().nativeElement.close();
  }

  protected go(i: number): void {
    this.index.set(i);
  }

  protected next(): void {
    this.index.update((i) => (i + 1) % this.items().length);
  }

  protected prev(): void {
    this.index.update((i) => (i - 1 + this.items().length) % this.items().length);
  }
}
