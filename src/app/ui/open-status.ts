import { Component, DestroyRef, afterNextRender, inject, input, signal } from '@angular/core';

/** Horario por día de la semana (0 = domingo). `null` = cerrado. Horas "HH:MM". */
export type Schedule = ([open: string, close: string] | null)[];

const DAYS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const toMin = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3, 5);

function status(schedule: Schedule, now: Date): { open: boolean; text: string } {
  const day = now.getDay();
  const min = now.getHours() * 60 + now.getMinutes();
  const today = schedule[day];
  if (today && min >= toMin(today[0]) && min < toMin(today[1])) {
    return { open: true, text: `Abierto · cierra ${today[1]}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (day + i) % 7;
    const slot = schedule[d];
    if (!slot || (i === 0 && min >= toMin(slot[0]))) continue;
    const when = i === 0 ? 'hoy' : i === 1 ? 'mañana' : `el ${DAYS[d]}`;
    return { open: false, text: `Abrimos ${when} ${slot[0]}` };
  }
  return { open: false, text: 'Cerrado' };
}

/** Etiqueta "Abierto ahora" / "Abrimos…" según la hora local. */
@Component({
  selector: 'app-open-status',
  host: { '[class.open]': 'state()?.open', '[hidden]': '!state()' },
  template: `<span class="dot" aria-hidden="true"></span>{{ state()?.text }}`,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.3rem 0.75rem;
      background: var(--blush);
      color: var(--ink);
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
      border-radius: 999px;
    }

    :host([hidden]) {
      display: none;
    }

    .dot {
      width: 8px;
      height: 8px;
      background: #b0566f;
      border-radius: 50%;
    }

    :host(.open) .dot {
      background: #2e7d4f;
      box-shadow: 0 0 0 3px rgba(46, 125, 79, 0.2);
    }
  `,
})
export class OpenStatus {
  readonly schedule = input.required<Schedule>();
  protected readonly state = signal<{ open: boolean; text: string } | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const update = () =>
        this.state.set(this.schedule().some(Boolean) ? status(this.schedule(), new Date()) : null);
      update();
      const id = setInterval(update, 60_000);
      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
