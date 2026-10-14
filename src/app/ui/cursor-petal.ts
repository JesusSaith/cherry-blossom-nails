import { Component, DestroyRef, ElementRef, afterNextRender, inject } from '@angular/core';

/** Pétalo que sigue al cursor. Solo con mouse y sin "reducir movimiento". */
@Component({
  selector: 'app-cursor-petal',
  host: { 'aria-hidden': 'true' },
  template: '',
  styles: `
    :host {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 20;
      width: 14px;
      height: 14px;
      pointer-events: none;
      background: linear-gradient(135deg, #f6e9e9, #c9959f);
      border-radius: 150% 0 150% 0;
      opacity: 0;
      transition: opacity 0.3s, transform 0.12s ease-out;
    }

    :host(.on) {
      opacity: 0.9;
    }
  `,
})
export class CursorPetal {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (
        typeof matchMedia === 'undefined' ||
        !matchMedia('(pointer: fine)').matches ||
        matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        return;
      }
      const move = (e: MouseEvent) => {
        el.classList.add('on');
        el.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 14}px) rotate(${e.clientX % 360}deg)`;
      };
      window.addEventListener('mousemove', move, { passive: true });
      destroyRef.onDestroy(() => window.removeEventListener('mousemove', move));
    });
  }
}
