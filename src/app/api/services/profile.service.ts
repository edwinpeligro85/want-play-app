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

import { Chat } from '../models/chat';
import { Profile } from '../models/profile';
import { ProfileResponseDto } from '../models/profile-response-dto';
import { UpdateProfileDto } from '../models/update-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation profileControllerFindOne
   */
  static readonly ProfileControllerFindOnePath = '/api/v1/profile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFindOne()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFindOne$Response(params: { id: string }): Observable<StrictHttpResponse<ProfileResponseDto>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFindOnePath, 'get');
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
          return r as StrictHttpResponse<ProfileResponseDto>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFindOne$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFindOne(params: { id: string }): Observable<ProfileResponseDto> {
    return this.profileControllerFindOne$Response(params).pipe(
      map((r: StrictHttpResponse<ProfileResponseDto>) => r.body as ProfileResponseDto)
    );
  }

  /**
   * Path part for operation profileControllerUpdate
   */
  static readonly ProfileControllerUpdatePath = '/api/v1/profile/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  profileControllerUpdate$Response(params: {
    id: string;
    body: UpdateProfileDto;
  }): Observable<StrictHttpResponse<Profile>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerUpdatePath, 'patch');
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
          return r as StrictHttpResponse<Profile>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  profileControllerUpdate(params: { id: string; body: UpdateProfileDto }): Observable<Profile> {
    return this.profileControllerUpdate$Response(params).pipe(
      map((r: StrictHttpResponse<Profile>) => r.body as Profile)
    );
  }

  /**
   * Path part for operation profileControllerFollowers
   */
  static readonly ProfileControllerFollowersPath = '/api/v1/profile/{id}/followers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFollowers()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowers$Response(params: {
    id: string;
    full: boolean;
  }): Observable<StrictHttpResponse<Array<Profile>>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFollowersPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('full', params.full, {});
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
          return r as StrictHttpResponse<Array<Profile>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFollowers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowers(params: { id: string; full: boolean }): Observable<Array<Profile>> {
    return this.profileControllerFollowers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Profile>>) => r.body as Array<Profile>)
    );
  }

  /**
   * Path part for operation profileControllerFollowersCount
   */
  static readonly ProfileControllerFollowersCountPath = '/api/v1/profile/{id}/followers_count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFollowersCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowersCount$Response(params: { id: string }): Observable<StrictHttpResponse<number>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFollowersCountPath, 'get');
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
          return (r as HttpResponse<any>).clone({
            body: parseFloat(String((r as HttpResponse<any>).body)),
          }) as StrictHttpResponse<number>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFollowersCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowersCount(params: { id: string }): Observable<number> {
    return this.profileControllerFollowersCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation profileControllerFollowing
   */
  static readonly ProfileControllerFollowingPath = '/api/v1/profile/{id}/following';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFollowing()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowing$Response(params: {
    id: string;
    full: boolean;
  }): Observable<StrictHttpResponse<Array<Profile>>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFollowingPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
      rb.query('full', params.full, {});
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
          return r as StrictHttpResponse<Array<Profile>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFollowing$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowing(params: { id: string; full: boolean }): Observable<Array<Profile>> {
    return this.profileControllerFollowing$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Profile>>) => r.body as Array<Profile>)
    );
  }

  /**
   * Path part for operation profileControllerFollowingCount
   */
  static readonly ProfileControllerFollowingCountPath = '/api/v1/profile/{id}/following_count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFollowingCount()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowingCount$Response(params: { id: string }): Observable<StrictHttpResponse<number>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFollowingCountPath, 'get');
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
          return (r as HttpResponse<any>).clone({
            body: parseFloat(String((r as HttpResponse<any>).body)),
          }) as StrictHttpResponse<number>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFollowingCount$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollowingCount(params: { id: string }): Observable<number> {
    return this.profileControllerFollowingCount$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

  /**
   * Path part for operation profileControllerFindChats
   */
  static readonly ProfileControllerFindChatsPath = '/api/v1/profile/{id}/chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFindChats()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFindChats$Response(params: { id: string }): Observable<StrictHttpResponse<Array<Chat>>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFindChatsPath, 'get');
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
          return r as StrictHttpResponse<Array<Chat>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `profileControllerFindChats$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFindChats(params: { id: string }): Observable<Array<Chat>> {
    return this.profileControllerFindChats$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Chat>>) => r.body as Array<Chat>)
    );
  }

  /**
   * Path part for operation profileControllerFollow
   */
  static readonly ProfileControllerFollowPath = '/api/v1/profile/{id}/following/{target}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerFollow()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollow$Response(params: { id: string; target: string }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerFollowPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('target', params.target, {});
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
   * To access the full response (for headers, for example), `profileControllerFollow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerFollow(params: { id: string; target: string }): Observable<void> {
    return this.profileControllerFollow$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }

  /**
   * Path part for operation profileControllerUnfollow
   */
  static readonly ProfileControllerUnfollowPath = '/api/v1/profile/{id}/following/{target}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `profileControllerUnfollow()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerUnfollow$Response(params: { id: string; target: string }): Observable<StrictHttpResponse<void>> {
    const rb = new RequestBuilder(this.rootUrl, ProfileService.ProfileControllerUnfollowPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
      rb.path('target', params.target, {});
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
   * To access the full response (for headers, for example), `profileControllerUnfollow$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  profileControllerUnfollow(params: { id: string; target: string }): Observable<void> {
    return this.profileControllerUnfollow$Response(params).pipe(map((r: StrictHttpResponse<void>) => r.body as void));
  }
}
