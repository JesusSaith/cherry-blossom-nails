import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [NgOptimizedImage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(window:scroll)': 'onScroll()',
  },
})
export class App {
  protected readonly navSolid = signal(false);
  protected readonly instagram = 'https://www.instagram.com/nailstudio_cherryblossom';
  /** Pega aquí el número cuando lo tengas, solo dígitos y +. */
  protected readonly phone = '';
  protected readonly mapUrl: SafeResourceUrl;

  protected onScroll(): void {
    this.navSolid.set(window.scrollY > 12);
  }

  constructor(sanitizer: DomSanitizer) {
    this.mapUrl = sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d318.2229200940584!2d-96.72699504137019!3d18.814860023252457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c48d000144cbab%3A0x4d7af7e766833e12!2sCherry%20Blossom!5e1!3m2!1ses-419!2smx!4v1791678269980!5m2!1ses-419!2smx',
    );
  }
}
