import { Component } from '@angular/core';

/** Pétalos que caen sobre el hero. Decorativo. */
@Component({
  selector: 'app-falling-petals',
  host: { 'aria-hidden': 'true' },
  template: `
    @for (p of petals; track $index) {
      <span
        [style.left.%]="p.left"
        [style.width.px]="p.size"
        [style.height.px]="p.size"
        [style.animation-delay.s]="p.delay"
        [style.animation-duration.s]="p.duration"
      ></span>
    }
  `,
  styles: `
    :host {
      position: absolute;
      inset: 0 0 auto;
      height: 100vh;
      overflow: hidden;
      pointer-events: none;
      z-index: 1;
    }

    span {
      position: absolute;
      top: -5vh;
      background: linear-gradient(135deg, #fde4ee, #e48aaa);
      border-radius: 150% 0 150% 0;
      opacity: 0;
      animation: fall linear infinite;
    }

    @keyframes fall {
      0% {
        opacity: 0;
        transform: translate(0, 0) rotate(0);
      }
      10% {
        opacity: 0.9;
      }
      100% {
        opacity: 0;
        transform: translate(90px, 105vh) rotate(540deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      :host {
        display: none;
      }
    }
  `,
})
export class FallingPetals {
  protected readonly petals = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i * 1.3) % 10,
    duration: 9 + ((i * 7) % 8),
    size: 10 + ((i * 5) % 10),
  }));
}
