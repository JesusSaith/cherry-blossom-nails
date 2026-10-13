import { Component, signal } from '@angular/core';

interface Bloom {
  x: number;
  y: number;
  r: number;
  fill: string;
}

const COLORS = ['#f4b6cb', '#e48aaa', '#f7c3d4', '#fde4ee', '#c45378'];

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

@Component({
  selector: 'app-sakura-tree',
  host: { 'aria-hidden': 'true', '(click)': 'burst($event)' },
  template: `
    <svg viewBox="0 0 500 500" focusable="false">
      <ellipse cx="250" cy="490" rx="190" ry="12" fill="#f4b6cb" opacity="0.5" />
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
    @for (d of drops(); track d.id) {
      <span class="drop" [style.left.px]="d.x" [style.top.px]="d.y" [style.--dx.px]="d.dx"></span>
    }
  `,
  styles: `
    :host {
      position: relative;
      display: block;
    }

    .drop {
      position: absolute;
      width: 12px;
      height: 12px;
      pointer-events: none;
      background: linear-gradient(135deg, #fde4ee, #e48aaa);
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
      animation: sway 7s ease-in-out infinite alternate;
    }

    @keyframes sway {
      from {
        transform: rotate(-1deg);
      }
      to {
        transform: rotate(1deg);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .canopy {
        animation: none;
      }
    }
  `,
})
export class SakuraTree {
  protected readonly blooms = makeBlooms();
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
