import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './app/auth/token-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));
