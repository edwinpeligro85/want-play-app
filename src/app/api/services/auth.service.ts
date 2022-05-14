/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { LoginDto } from '../models/login-dto';
import { LoginResponseDto } from '../models/login-response-dto';
import { SignUpDto } from '../models/sign-up-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerRegister
   */
  static readonly AuthControllerRegisterPath = '/v1/auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerRegister()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister$Response(params: { body: SignUpDto }): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerRegisterPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<User>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerRegister$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerRegister(params: { body: SignUpDto }): Observable<User> {
    return this.authControllerRegister$Response(params).pipe(map((r: StrictHttpResponse<User>) => r.body as User));
  }

  /**
   * Path part for operation authControllerConfirm
   */
  static readonly AuthControllerConfirmPath = '/v1/auth/confirm';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerConfirm()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerConfirm$Response(params: { token: string }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerConfirmPath, 'get');
    if (params) {
      rb.query('token', params.token, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerConfirm$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerConfirm(params: { token: string }): Observable<boolean> {
    return this.authControllerConfirm$Response(params).pipe(map((r: StrictHttpResponse<boolean>) => r.body as boolean));
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/v1/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: { body: LoginDto }): Observable<StrictHttpResponse<LoginResponseDto>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'application/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<LoginResponseDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: { body: LoginDto }): Observable<LoginResponseDto> {
    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<LoginResponseDto>) => r.body as LoginResponseDto)
    );
  }
}
