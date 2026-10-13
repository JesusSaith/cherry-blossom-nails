import { DestroyRef, Directive, ElementRef, afterNextRender, inject, signal } from '@angular/core';

/** Aparece con fade al entrar en pantalla. Estilos en styles.scss (.reveal). */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.is-visible]': 'visible()',
  },
})
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly visible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(this.el.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
