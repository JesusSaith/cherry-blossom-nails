import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { startMotion } from './motion';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SectionTitle } from './ui/section-title';
import { Service, ServiceGrid } from './ui/service-grid';
import { Hours, SiteFooter } from './ui/site-footer';
import { Reveal } from './ui/reveal';
import { Testimonials } from './ui/testimonials';
import type { Testimonial } from './ui/testimonials';
import { BeforeAfter } from './ui/before-after';
import { OpenStatus, Schedule } from './ui/open-status';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage,
    MatIcon,
    SectionTitle,
    ServiceGrid,
    Reveal,
    SiteFooter,
    Testimonials,
    BeforeAfter,
    OpenStatus,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
})
export class App {
  protected readonly navSolid = signal(false);
  protected readonly pastHero = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly progress = signal(0);
  protected readonly active = signal('');

  protected readonly navLinks = [
    { id: 'servicios', label: 'Servicios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  /** Eslogan letra por letra; `em` va en el acento. */
  protected readonly heroWords = (() => {
    let n = 0;
    return (
      [
        ['El', false],
        ['arte', false],
        ['está', true],
        ['en', true],
        ['ti', true],
      ] as const
    ).map(([word, em]) => ({ em, letters: [...word].map((c) => ({ c, delay: n++ * 55 })) }));
  })();
  protected readonly instagram = 'https://www.instagram.com/nailstudio_cherryblossom';
  protected readonly facebook = 'https://www.facebook.com/profile.php?id=100071971999914';
  /** WhatsApp con lada, solo dígitos (ej. 5212711234567). Vacío oculta el botón. */
  protected readonly whatsapp = signal('522713151569');
  protected readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${this.whatsapp()}?text=${encodeURIComponent('Hola Cherry Blossom, quiero agendar una cita 🌸')}`,
  );
  /** Fotos en /public. Vacío oculta el antes/después. */
  protected readonly beforeAfter = { before: '', after: '' };
  /** Capturas de comentarios reales en /public. Vacío oculta la sección. */
  protected readonly testimonials: Testimonial[] = [];
  protected readonly mapUrl: SafeResourceUrl;

  protected readonly services: Service[] = [
    {
      icon: 'auto_awesome',
      title: 'Softgel · Gel X',
      text: 'Extensión prefabricada de gel (tips) que se adhiere a la uña para un acabado más natural.',
    },
    {
      icon: 'layers',
      title: 'Gel',
      text: 'Sistema de refuerzo y construcción: base rubber, gel de construcción y esmaltado semipermanente.',
    },
    {
      icon: 'diamond',
      title: 'Acrílico',
      text: 'Ideal si deseas uñas largas, fuertes y resistentes. Versátiles: se diseñan en distintas formas, tamaños y colores.',
    },
    {
      icon: 'footprint',
      title: 'Pedicure',
      text: 'Limpieza, mantenimiento y embellecimiento de los pies y las uñas.',
    },
  ];




  /**
   * Horario real por día, empezando en domingo. `null` = cerrado.
   * Ej.: [null, ['10:00', '19:00'], ..., ['10:00', '15:00']]. Vacío oculta la etiqueta y el horario del footer.
   */
  protected readonly schedule: Schedule = [];
  protected readonly hours: Hours[] = this.schedule.flatMap((slot, d) =>
    slot
      ? [{ days: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][d], time: `${slot[0]}–${slot[1]}` }]
      : [],
  );




  protected toTop(): void {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
  }

  protected onScroll(): void {
    const y = window.scrollY;
    this.navSolid.set(y > 12);
    this.pastHero.set(y > window.innerHeight * 0.6);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(max > 0 ? y / max : 0);
    let current = '';
    for (const { id } of this.navLinks) {
      const top = document.getElementById(id)?.getBoundingClientRect().top;
      if (top !== undefined && top <= 140) current = id;
    }
    this.active.set(current);
  }

  constructor(sanitizer: DomSanitizer) {
    const destroyRef = inject(DestroyRef);
    afterNextRender(async () => {
      const stop = await startMotion();
      destroyRef.onDestroy(stop);
    });

    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d318.2229200940584!2d-96.72699504137019!3d18.814860023252457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c48d000144cbab%3A0x4d7af7e766833e12!2sCherry%20Blossom!5e1!3m2!1ses-419!2smx!4v1791678269980!5m2!1ses-419!2smx',
    );
  }
}
