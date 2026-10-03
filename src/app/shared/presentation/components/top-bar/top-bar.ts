import { Component, computed, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  imports: [LanguageSwitcher, MatToolbarModule, TranslatePipe],
  selector: 'app-top-bar',
  styleUrl: './top-bar.css',
  templateUrl: './top-bar.html',
})
export class TopBar {
  readonly menuToggled = output<void>();

  readonly #translate = inject(TranslateService);
  readonly #currentLanguage = toSignal(
    this.#translate.onLangChange.pipe(map((event) => event.lang)),
    { initialValue: this.#translate.getCurrentLang() ?? 'en' },
  );

  protected readonly formattedDate = computed(() =>
    new Intl.DateTimeFormat(this.#currentLanguage() === 'es' ? 'es-PE' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date()),
  );
}
