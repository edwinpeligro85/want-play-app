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

import { ChangePasswordDto } from '../models/change-password-dto';
import { ForgotPasswordDto } from '../models/forgot-password-dto';
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

  /**
   * Path part for operation authControllerGetMe
   */
  static readonly AuthControllerGetMePath = '/v1/auth/me';

  /**
   * Get current user
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerGetMe()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerGetMe$Response(params?: {}): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerGetMePath, 'get');
    if (params) {
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
   * Get current user
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerGetMe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerGetMe(params?: {}): Observable<User> {
    return this.authControllerGetMe$Response(params).pipe(map((r: StrictHttpResponse<User>) => r.body as User));
  }

  /**
   * Path part for operation authControllerForgotPassword
   */
  static readonly AuthControllerForgotPasswordPath = '/v1/auth/forgotPassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerForgotPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerForgotPassword$Response(params: { body: ForgotPasswordDto }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerForgotPasswordPath, 'post');
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerForgotPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerForgotPassword(params: { body: ForgotPasswordDto }): Observable<boolean> {
    return this.authControllerForgotPassword$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation authControllerChangePassword
   */
  static readonly AuthControllerChangePasswordPath = '/v1/auth/changePassword';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerChangePassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerChangePassword$Response(params: { body: ChangePasswordDto }): Observable<StrictHttpResponse<boolean>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerChangePasswordPath, 'patch');
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
          return (r as HttpResponse<any>).clone({
            body: String((r as HttpResponse<any>).body) === 'true',
          }) as StrictHttpResponse<boolean>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerChangePassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerChangePassword(params: { body: ChangePasswordDto }): Observable<boolean> {
    return this.authControllerChangePassword$Response(params).pipe(
      map((r: StrictHttpResponse<boolean>) => r.body as boolean)
    );
  }

  /**
   * Path part for operation authControllerFacebookLogin
   */
  static readonly AuthControllerFacebookLoginPath = '/v1/auth/facebook';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerFacebookLogin()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerFacebookLogin$Response(params?: {}): Observable<StrictHttpResponse<number>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerFacebookLoginPath, 'get');
    if (params) {
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
            body: parseFloat(String((r as HttpResponse<any>).body)),
          }) as StrictHttpResponse<number>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerFacebookLogin$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerFacebookLogin(params?: {}): Observable<number> {
    return this.authControllerFacebookLogin$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation authControllerFacebookLoginRedirect
   */
  static readonly AuthControllerFacebookLoginRedirectPath = '/v1/auth/facebook/redirect';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerFacebookLoginRedirect()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerFacebookLoginRedirect$Response(params?: {}): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerFacebookLoginRedirectPath, 'get');
    if (params) {
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerFacebookLoginRedirect$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerFacebookLoginRedirect(params?: {}): Observable<{}> {
    return this.authControllerFacebookLoginRedirect$Response(params).pipe(
      map((r: StrictHttpResponse<{}>) => r.body as {})
    );
  }
}
