import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { Credentials } from '@app/auth/credentials.service';

const credentialsKey = 'credentials';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  private credentials: Credentials | null = null;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf('assets') > -1) return next.handle(request);

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });

      const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
      this.credentials = JSON.parse(savedCredentials ?? '');
      if (savedCredentials) {
        const headers = {
          Authorization: `Bearer ${this.credentials?.token}`,
        };
        request = request.clone({ setHeaders: headers });
      }
    }

    return next.handle(request);
  }
}
