import { Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  imports: [MatButtonToggleModule, TranslatePipe],
  selector: 'app-language-switcher',
  styleUrl: './language-switcher.css',
  templateUrl: './language-switcher.html',
})
export class LanguageSwitcher {
  protected currentLang = 'en';
  protected readonly languages: readonly string[];

  readonly #translate = inject(TranslateService);

  constructor() {
    this.currentLang = this.#translate.getCurrentLang() ?? 'en';
    this.languages = [...this.#translate.getLangs()];
  }

  protected useLanguage(language: string): void {
    this.#translate.use(language);
    this.currentLang = language;
    document.documentElement.lang = language;
  }
}
