import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

const supportedLanguages = ['en', 'es'];
const defaultLanguage = 'en';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
      fallbackLang: defaultLanguage,
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.addLangs(supportedLanguages);
      document.documentElement.lang = defaultLanguage;
      return translate.use(defaultLanguage);
    }),
    provideRouter(routes),
  ],
};
