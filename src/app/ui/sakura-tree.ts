import { Component, signal } from '@angular/core';

interface Bloom {
  x: number;
  y: number;
  r: number;
  fill: string;
}

const COLORS = ['#e8cfd2', '#c9959f', '#ecd5d7', '#f6e9e9', '#9c4a5f'];

/** Copas del árbol: [x, y, radio]. */
const CLUSTERS: [number, number, number][] = [
  [100, 215, 55], [75, 180, 40], [165, 130, 50], [250, 100, 62], [340, 105, 52],
  [395, 195, 55], [440, 235, 40], [300, 175, 55], [200, 180, 50], [150, 255, 40],
];

/** Pseudoaleatorio con semilla fija para que el árbol siempre se vea igual. */
function makeBlooms(): Bloom[] {
  let seed = 7;
  const rand = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
  return CLUSTERS.flatMap(([cx, cy, radius]) =>
    Array.from({ length: 16 }, () => {
      const angle = rand() * Math.PI * 2;
      const dist = rand() * radius;
      return {
        x: Math.round(cx + Math.cos(angle) * dist),
        y: Math.round(cy + Math.sin(angle) * dist * 0.8),
        r: Math.round(10 + rand() * 14),
        fill: COLORS[Math.floor(rand() * COLORS.length)],
      };
    }),
  );
}

/** Puntos de la copa (en %) de donde caen flores, con su retraso. */
const FALLING = [
  { x: 22, y: 42, dx: -40, delay: 0 },
  { x: 52, y: 22, dx: 30, delay: 1.5 },
  { x: 78, y: 40, dx: 50, delay: 3 },
  { x: 38, y: 32, dx: -20, delay: 4.5 },
  { x: 66, y: 30, dx: 40, delay: 6 },
  { x: 30, y: 50, dx: -50, delay: 7.5 },
];

@Component({
  selector: 'app-sakura-tree',
  host: { 'aria-hidden': 'true', '(click)': 'burst($event)' },
  template: `
    <svg viewBox="0 0 500 500" focusable="false">
      <ellipse cx="250" cy="490" rx="190" ry="12" fill="#e8cfd2" opacity="0.5" />
      <g fill="none" stroke="#6b3e4c" stroke-linecap="round">
        <path stroke-width="28" d="M250 500 C245 440 262 400 240 340 C225 300 235 270 250 240" />
        <path stroke-width="14" d="M242 330 C200 300 160 290 110 250" />
        <path stroke-width="8" d="M150 280 C130 240 120 210 90 190" />
        <path stroke-width="14" d="M248 300 C300 270 340 250 390 210" />
        <path stroke-width="8" d="M340 250 C370 230 410 230 440 240" />
        <path stroke-width="12" d="M250 240 C255 200 240 170 250 120" />
        <path stroke-width="7" d="M250 200 C220 170 200 150 170 130" />
        <path stroke-width="7" d="M252 180 C290 150 320 140 340 110" />
      </g>
      <g class="canopy">
        @for (b of blooms; track $index) {
          <circle [attr.cx]="b.x" [attr.cy]="b.y" [attr.r]="b.r" [attr.fill]="b.fill" opacity="0.85" />
        }
      </g>
    </svg>
    @for (p of falling; track $index) {
      <span
        class="fall"
        [style.left.%]="p.x"
        [style.top.%]="p.y"
        [style.--dx.px]="p.dx"
        [style.animation-delay.s]="p.delay"
      ></span>
    }
    @for (d of drops(); track d.id) {
      <span class="drop" [style.left.px]="d.x" [style.top.px]="d.y" [style.--dx.px]="d.dx"></span>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
    }

    /* Flores que se desprenden de la copa cada tanto. */
    .fall {
      position: absolute;
      width: 10px;
      height: 10px;
      pointer-events: none;
      opacity: 0;
      background: linear-gradient(135deg, #f6e9e9, #c9959f);
      border-radius: 150% 0 150% 0;
      animation: fall 9s ease-in infinite;
    }

    @keyframes fall {
      0% {
        opacity: 0;
        transform: none;
      }
      8% {
        opacity: 1;
      }
      45%,
      100% {
        opacity: 0;
        transform: translate(var(--dx), 220px) rotate(300deg);
      }
    }

    .drop {
      position: absolute;
      width: 12px;
      height: 12px;
      pointer-events: none;
      background: linear-gradient(135deg, #f6e9e9, #c9959f);
      border-radius: 150% 0 150% 0;
      animation: drop 1.6s ease-in forwards;
    }

    @keyframes drop {
      to {
        opacity: 0;
        transform: translate(var(--dx), 160px) rotate(360deg);
      }
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }

    .canopy {
      transform-box: view-box;
      transform-origin: 50% 100%;
      animation: sway 5s ease-in-out infinite alternate;
    }

    @keyframes sway {
      from {
        transform: rotate(-2.5deg);
      }
      to {
        transform: rotate(2.5deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .canopy {
        animation: none;
      }

      .fall {
        display: none;
      }
    }
  `,
})
export class SakuraTree {
  protected readonly blooms = makeBlooms();
  protected readonly falling = FALLING;
  protected readonly drops = signal<{ id: number; x: number; y: number; dx: number }[]>([]);
  private nextId = 0;

  protected burst(e: MouseEvent): void {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const fresh = Array.from({ length: 8 }, () => ({
      id: this.nextId++,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      dx: Math.round(Math.random() * 120 - 60),
    }));
    this.drops.update((d) => [...d, ...fresh]);
    const ids = new Set(fresh.map((d) => d.id));
    setTimeout(() => this.drops.update((d) => d.filter((x) => !ids.has(x.id))), 1700);
  }
}
