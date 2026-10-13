import { Directive, ElementRef, inject } from '@angular/core';

/** Inclina la tarjeta siguiendo el mouse. Ignora táctil y "reducir movimiento". */
@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'move($event)',
    '(pointerleave)': 'reset()',
  },
})
export class Tilt {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected move(e: PointerEvent): void {
    if (e.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    this.el.style.transform = `perspective(700px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
  }

  protected reset(): void {
    this.el.style.transform = '';
  }
}
