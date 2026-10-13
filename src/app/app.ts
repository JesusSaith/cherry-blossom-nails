import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SectionTitle } from './ui/section-title';
import { Service, ServiceGrid } from './ui/service-grid';
import { PriceItem, PriceList } from './ui/price-list';
import { GalleryItem } from './ui/gallery';
import { Carousel } from './ui/carousel';
import { Hours, SiteFooter } from './ui/site-footer';
import { Faq, FaqItem } from './ui/faq';
import { Reveal } from './ui/reveal';
import { Step, Steps } from './ui/steps';
import { ContactCard } from './ui/contact-card';
import { SakuraTree } from './ui/sakura-tree';
import { FallingPetals } from './ui/falling-petals';
import { Testimonial, Testimonials } from './ui/testimonials';
import { BeforeAfter } from './ui/before-after';
import { NailStyle, StyleCards } from './ui/style-cards';
import { CursorPetal } from './ui/cursor-petal';
import { Marquee } from './ui/marquee';
import { OpenStatus, Schedule } from './ui/open-status';

@Component({
  selector: 'app-root',
  imports: [
    NgOptimizedImage,
    MatIcon,
    SectionTitle,
    ServiceGrid,
    PriceList,
    Carousel,
    Faq,
    Reveal,
    SiteFooter,
    Steps,
    ContactCard,
    SakuraTree,
    FallingPetals,
    Testimonials,
    BeforeAfter,
    StyleCards,
    CursorPetal,
    Marquee,
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
  protected readonly menuOpen = signal(false);
  protected readonly progress = signal(0);
  protected readonly active = signal('');
  protected readonly heroIndex = signal(0);

  protected readonly navLinks = [
    { id: 'nosotros', label: 'Nosotras' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'precios', label: 'Precios' },
    { id: 'trabajos', label: 'Trabajos' },
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
  /** Pega aquí el número cuando lo tengas, solo dígitos y +. */
  protected readonly phone = '';
  /** WhatsApp con lada, solo dígitos (ej. 5212711234567). Vacío oculta el botón. */
  protected readonly whatsapp = signal('');
  protected readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${this.whatsapp()}?text=${encodeURIComponent('Hola Cherry Blossom, quiero agendar una cita 🌸')}`,
  );
  /** Fotos en /public. Vacío oculta el antes/después. */
  protected readonly beforeAfter = { before: '', after: '' };
  /** Capturas de comentarios reales en /public. Vacío oculta la sección. */
  protected readonly testimonials: Testimonial[] = [];
  protected readonly mapUrl: SafeResourceUrl;
  protected readonly mapsLink = 'https://www.google.com/maps?q=18.814860023252457,-96.72699504137019';

  protected readonly services: Service[] = [
    { icon: 'back_hand', title: 'Manos', text: 'Manicure, esmaltado y diseño de uñas.' },
    { icon: 'footprint', title: 'Pies', text: 'Pedicure y cuidado de los pies.' },
    { icon: 'brush', title: 'Diseño', text: 'Flores, detalles y el estilo que traigas.' },
  ];

  /** Llena `price` cuando tengas la lista; vacío muestra "Consultar". */
  protected readonly prices: PriceItem[] = [
    { name: 'Manicure' },
    { name: 'Pedicure' },
    { name: 'Esmaltado' },
    { name: 'Diseño de uñas' },
  ];

  protected readonly nailStyles: NailStyle[] = [
    { name: 'Flores', hint: 'Cerezo y detalles a mano', src: 'work-1.jpg', alt: 'Uñas con flores de cerezo' },
    { name: 'Negro', hint: 'Elegante con estrellas', src: 'work-2.png', alt: 'Uñas negras con estrellas' },
    { name: 'Rojo y dorado', hint: 'Clásico con brillo', src: 'work-3.jpg', alt: 'Uñas rojas con detalles dorados' },
    { name: 'Perlado', hint: 'Azul con efecto perla', src: 'work-4.jpg', alt: 'Uñas azul perlado' },
  ];

  protected readonly works: GalleryItem[] = [
    { src: 'work-1.jpg', alt: 'Uñas con flores de cerezo', caption: 'Flores', width: 768, height: 1024 },
    { src: 'work-2.png', alt: 'Uñas negras con estrellas', caption: 'Negro', width: 768, height: 1024 },
    { src: 'work-3.jpg', alt: 'Uñas rojas con detalles dorados', caption: 'Rojo', width: 768, height: 1024 },
    { src: 'work-4.jpg', alt: 'Uñas azul perlado', caption: 'Azul', width: 768, height: 1024 },
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

  protected readonly marquee = ['Manicure', 'Pedicure', 'Diseño a mano', 'Esmaltado', 'El arte está en ti'];

  protected readonly steps: Step[] = [
    { icon: 'touch_app', title: 'Elige', text: 'Manos, pies o ambos.' },
    { icon: 'chat', title: 'Escribe', text: 'Mándanos mensaje por Instagram.' },
    { icon: 'spa', title: 'Visítanos', text: 'Te esperamos en el salón.' },
  ];

  protected readonly faqs: FaqItem[] = [
    { question: '¿Hacen manos y pies?', answer: 'Sí. Manicure y pedicure.' },
    { question: '¿Cómo agendo?', answer: 'Por Instagram, en @nailstudio_cherryblossom.' },
    { question: '¿Dónde están?', answer: 'En el mapa de la sección de contacto.' },
  ];

  protected toTop(): void {
    const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    document.querySelector<HTMLElement>('.brand')?.focus({ preventScroll: true });
  }

  protected onScroll(): void {
    const y = window.scrollY;
    this.navSolid.set(y > 12);
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
    afterNextRender(() => {
      if (typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const id = setInterval(() => this.heroIndex.update((i) => (i + 1) % this.works.length), 4000);
      destroyRef.onDestroy(() => clearInterval(id));
    });

    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d318.2229200940584!2d-96.72699504137019!3d18.814860023252457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c48d000144cbab%3A0x4d7af7e766833e12!2sCherry%20Blossom!5e1!3m2!1ses-419!2smx!4v1791678269980!5m2!1ses-419!2smx',
    );
  }
}
