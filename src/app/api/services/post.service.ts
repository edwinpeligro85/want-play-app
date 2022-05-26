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
import { Post } from '../models/post';
import { UpdatePostDto } from '../models/update-post-dto';

@Injectable({
  providedIn: 'root',
})
export class PostService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
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
  postsControllerFindAll$Response(params?: {
    /**
     * Filter query string, see documentation for its schema
     */
    filter?: string;

    /**
     * Use only allowed properties separated by semicolon; default is ascending created_at; prefix name with hyphen/minus sign to get descending order
     */
    sort?: string;
    page?: number;
    limit?: number;
  }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, PostService.PostsControllerFindAllPath, 'get');
    if (params) {
      rb.query('filter', params.filter, {});
      rb.query('sort', params.sort, {});
      rb.query('page', params.page, {});
      rb.query('limit', params.limit, {});
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: '*/*',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindAll(params?: {
    /**
     * Filter query string, see documentation for its schema
     */
    filter?: string;

    /**
     * Use only allowed properties separated by semicolon; default is ascending created_at; prefix name with hyphen/minus sign to get descending order
     */
    sort?: string;
    page?: number;
    limit?: number;
  }): Observable<void> {
    return this.postsControllerFindAll$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
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
  postsControllerCreate$Response(params: { body: CreatePostDto }): Observable<StrictHttpResponse<Post>> {
    const rb = new RequestBuilder(this.rootUrl, PostService.PostsControllerCreatePath, 'post');
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
          return r as StrictHttpResponse<Post>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerCreate(params: { body: CreatePostDto }): Observable<Post> {
    return this.postsControllerCreate$Response(params).pipe(map((r: StrictHttpResponse<Post>) => r.body as Post));
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
  postsControllerFindOne$Response(params: { id: string }): Observable<StrictHttpResponse<Post>> {
    const rb = new RequestBuilder(this.rootUrl, PostService.PostsControllerFindOnePath, 'get');
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
          return r as StrictHttpResponse<Post>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerFindOne(params: { id: string }): Observable<Post> {
    return this.postsControllerFindOne$Response(params).pipe(map((r: StrictHttpResponse<Post>) => r.body as Post));
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
  postsControllerRemove$Response(params: { id: string }): Observable<StrictHttpResponse<{}>> {
    const rb = new RequestBuilder(this.rootUrl, PostService.PostsControllerRemovePath, 'delete');
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
   * To access the full response (for headers, for example), `postsControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  postsControllerRemove(params: { id: string }): Observable<{}> {
    return this.postsControllerRemove$Response(params).pipe(map((r: StrictHttpResponse<{}>) => r.body as {}));
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
  postsControllerUpdate$Response(params: { id: string; body: UpdatePostDto }): Observable<StrictHttpResponse<Post>> {
    const rb = new RequestBuilder(this.rootUrl, PostService.PostsControllerUpdatePath, 'patch');
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
          return r as StrictHttpResponse<Post>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `postsControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  postsControllerUpdate(params: { id: string; body: UpdatePostDto }): Observable<Post> {
    return this.postsControllerUpdate$Response(params).pipe(map((r: StrictHttpResponse<Post>) => r.body as Post));
  }
}
