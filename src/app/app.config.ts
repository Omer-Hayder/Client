import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideToastr(),
    importProvidersFrom(BsDropdownModule)
  ],
};
