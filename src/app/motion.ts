/**
 * Desplazamiento suave (Lenis) y animaciones al bajar (GSAP + ScrollTrigger).
 * Se cargan aparte para no pesar en la carga inicial. Devuelve la función de limpieza.
 */
export async function startMotion(): Promise<() => void> {
  if (typeof matchMedia === 'undefined' || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  const [{ default: Lenis }, { gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
    import('lenis'),
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/SplitText'),
  ]);
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const lenis = new Lenis({ anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const ctx = gsap.context(() => {
    // El logo aparece con un giro suave al cargar.
    gsap.from('.hero-logo', {
      opacity: 0,
      scale: 0.7,
      rotate: -8,
      duration: 1.4,
      delay: 0.9,
      ease: 'power3.out',
    });

    // El logo baja más lento que la página (profundidad).
    gsap.to('.hero-logo', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });



    // La foto del salón en Servicios se desplaza más lento (parallax).
    gsap.fromTo(
      '.section-photo img',
      { yPercent: -8 },
      {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: '.photo-bg', start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );

    // Los títulos de sección se arman palabra por palabra.
    gsap.utils.toArray<HTMLElement>('main section:not(.hero) h2').forEach((h2) => {
      const split = SplitText.create(h2, { type: 'words' });
      gsap.from(split.words, {
        yPercent: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: h2, start: 'top 85%' },
      });
    });
  });

  return () => {
    ctx.revert();
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
