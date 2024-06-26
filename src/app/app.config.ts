import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideNzIcons } from './icons-provider';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { jwtInterceptor } from './interceptors/jwt.interceptor';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideNzIcons(),
        provideNzI18n(en_US),
        importProvidersFrom(FormsModule),
        importProvidersFrom(HttpClientModule),
        provideAnimations(),
        provideToastr({
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        provideHttpClient(
            withInterceptors([jwtInterceptor])
        )
    ]
};
