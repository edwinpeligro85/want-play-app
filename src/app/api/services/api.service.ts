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

import { CreatePostDto } from '../models/create-post-dto';
import { CreateUserDto } from '../models/create-user-dto';
import { UpdatePostDto } from '../models/update-post-dto';
import { UpdateUserDto } from '../models/update-user-dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation appControllerGetHello
   */
  static readonly AppControllerGetHelloPath = '/api/v1';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerGetHello()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetHello$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.AppControllerGetHelloPath, 'get');
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `appControllerGetHello$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetHello(params?: {}): Observable<string> {
    return this.appControllerGetHello$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation usersControllerFindAll
   */
  static readonly UsersControllerFindAllPath = '/api/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerFindAll$Response(params?: {}): Observable<StrictHttpResponse<Array<User>>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerFindAllPath, 'get');
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
          return r as StrictHttpResponse<Array<User>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerFindAll(params?: {}): Observable<Array<User>> {
    return this.usersControllerFindAll$Response(params).pipe(
      map((r: StrictHttpResponse<Array<User>>) => r.body as Array<User>)
    );
  }

  /**
   * Path part for operation usersControllerCreate
   */
  static readonly UsersControllerCreatePath = '/api/v1/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreate$Response(params: { body: CreateUserDto }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerCreatePath, 'post');
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
          return r as StrictHttpResponse<{}>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerCreate(params: { body: CreateUserDto }): Observable<{}> {
    return this.usersControllerCreate$Response(params).pipe(map((r: StrictHttpResponse<{}>) => r.body as {}));
  }

  /**
   * Path part for operation usersControllerFindOne
   */
  static readonly UsersControllerFindOnePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerFindOne$Response(params: { id: string }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `usersControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerFindOne(params: { id: string }): Observable<{}> {
    return this.usersControllerFindOne$Response(params).pipe(map((r: StrictHttpResponse<{}>) => r.body as {}));
  }

  /**
   * Path part for operation usersControllerRemove
   */
  static readonly UsersControllerRemovePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerRemove$Response(params: { id: string }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersControllerRemove(params: { id: string }): Observable<string> {
    return this.usersControllerRemove$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation usersControllerUpdate
   */
  static readonly UsersControllerUpdatePath = '/api/v1/users/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerUpdate$Response(params: { id: string; body: UpdateUserDto }): Observable<StrictHttpResponse<User>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.UsersControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
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
   * To access the full response (for headers, for example), `usersControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  usersControllerUpdate(params: { id: string; body: UpdateUserDto }): Observable<User> {
    return this.usersControllerUpdate$Response(params).pipe(map((r: StrictHttpResponse<User>) => r.body as User));
  }

  /**
   * Path part for operation postsControllerFindAll
   */
  static readonly PostsControllerFindAllPath = '/api/v1/posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postsControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindAll$Response(params?: {}): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostsControllerFindAllPath, 'get');
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindAll(params?: {}): Observable<string> {
    return this.postsControllerFindAll$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postsControllerCreate
   */
  static readonly PostsControllerCreatePath = '/api/v1/posts';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postsControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerCreate$Response(params: { body: CreatePostDto }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostsControllerCreatePath, 'post');
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerCreate(params: { body: CreatePostDto }): Observable<string> {
    return this.postsControllerCreate$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postsControllerFindOne
   */
  static readonly PostsControllerFindOnePath = '/api/v1/posts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postsControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindOne$Response(params: { id: string }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostsControllerFindOnePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindOne(params: { id: string }): Observable<string> {
    return this.postsControllerFindOne$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postsControllerRemove
   */
  static readonly PostsControllerRemovePath = '/api/v1/posts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postsControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerRemove$Response(params: { id: string }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostsControllerRemovePath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerRemove(params: { id: string }): Observable<string> {
    return this.postsControllerRemove$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }

  /**
   * Path part for operation postsControllerUpdate
   */
  static readonly PostsControllerUpdatePath = '/api/v1/posts/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `postsControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerUpdate$Response(params: { id: string; body: UpdatePostDto }): Observable<StrictHttpResponse<string>> {
    const rb = new RequestBuilder(this.rootUrl, ApiService.PostsControllerUpdatePath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
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
          return r as StrictHttpResponse<string>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerUpdate(params: { id: string; body: UpdatePostDto }): Observable<string> {
    return this.postsControllerUpdate$Response(params).pipe(map((r: StrictHttpResponse<string>) => r.body as string));
  }
}
