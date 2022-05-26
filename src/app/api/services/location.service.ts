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

import { City } from '../models/city';
import { Country } from '../models/country';
import { CreateCityDto } from '../models/create-city-dto';
import { CreateCountryDto } from '../models/create-country-dto';
import { CreateStateDto } from '../models/create-state-dto';
import { State } from '../models/state';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation locationControllerFindAllCountries
   */
  static readonly LocationControllerFindAllCountriesPath = '/api/v1/location/country';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerFindAllCountries()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCountries$Response(params?: {}): Observable<StrictHttpResponse<Array<Country>>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerFindAllCountriesPath, 'get');
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
          return r as StrictHttpResponse<Array<Country>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerFindAllCountries$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCountries(params?: {}): Observable<Array<Country>> {
    return this.locationControllerFindAllCountries$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Country>>) => r.body as Array<Country>)
    );
  }

  /**
   * Path part for operation locationControllerCreateCountry
   */
  static readonly LocationControllerCreateCountryPath = '/api/v1/location/country';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerCreateCountry()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateCountry$Response(params: {
    body: CreateCountryDto;
  }): Observable<StrictHttpResponse<Country>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerCreateCountryPath, 'post');
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
          return r as StrictHttpResponse<Country>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerCreateCountry$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateCountry(params: { body: CreateCountryDto }): Observable<Country> {
    return this.locationControllerCreateCountry$Response(params).pipe(
      map((r: StrictHttpResponse<Country>) => r.body as Country)
    );
  }

  /**
   * Path part for operation locationControllerFindAllCountryStates
   */
  static readonly LocationControllerFindAllCountryStatesPath = '/api/v1/location/country/{id}/states';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerFindAllCountryStates()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCountryStates$Response(params: {
    id: string;
  }): Observable<StrictHttpResponse<Array<Country>>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerFindAllCountryStatesPath, 'get');
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
          return r as StrictHttpResponse<Array<Country>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerFindAllCountryStates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCountryStates(params: { id: string }): Observable<Array<Country>> {
    return this.locationControllerFindAllCountryStates$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Country>>) => r.body as Array<Country>)
    );
  }

  /**
   * Path part for operation locationControllerFindAllStates
   */
  static readonly LocationControllerFindAllStatesPath = '/api/v1/location/state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerFindAllStates()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllStates$Response(params?: {}): Observable<StrictHttpResponse<Array<State>>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerFindAllStatesPath, 'get');
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
          return r as StrictHttpResponse<Array<State>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerFindAllStates$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllStates(params?: {}): Observable<Array<State>> {
    return this.locationControllerFindAllStates$Response(params).pipe(
      map((r: StrictHttpResponse<Array<State>>) => r.body as Array<State>)
    );
  }

  /**
   * Path part for operation locationControllerCreateState
   */
  static readonly LocationControllerCreateStatePath = '/api/v1/location/state';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerCreateState()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateState$Response(params: { body: CreateStateDto }): Observable<StrictHttpResponse<State>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerCreateStatePath, 'post');
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
          return r as StrictHttpResponse<State>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerCreateState$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateState(params: { body: CreateStateDto }): Observable<State> {
    return this.locationControllerCreateState$Response(params).pipe(
      map((r: StrictHttpResponse<State>) => r.body as State)
    );
  }

  /**
   * Path part for operation locationControllerFindAllStateCities
   */
  static readonly LocationControllerFindAllStateCitiesPath = '/api/v1/location/state/{id}/cities';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerFindAllStateCities()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllStateCities$Response(params: { id: string }): Observable<StrictHttpResponse<Array<City>>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerFindAllStateCitiesPath, 'get');
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
          return r as StrictHttpResponse<Array<City>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerFindAllStateCities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllStateCities(params: { id: string }): Observable<Array<City>> {
    return this.locationControllerFindAllStateCities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<City>>) => r.body as Array<City>)
    );
  }

  /**
   * Path part for operation locationControllerFindAllCities
   */
  static readonly LocationControllerFindAllCitiesPath = '/api/v1/location/city';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerFindAllCities()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCities$Response(params?: {}): Observable<StrictHttpResponse<Array<City>>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerFindAllCitiesPath, 'get');
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
          return r as StrictHttpResponse<Array<City>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerFindAllCities$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  locationControllerFindAllCities(params?: {}): Observable<Array<City>> {
    return this.locationControllerFindAllCities$Response(params).pipe(
      map((r: StrictHttpResponse<Array<City>>) => r.body as Array<City>)
    );
  }

  /**
   * Path part for operation locationControllerCreateCity
   */
  static readonly LocationControllerCreateCityPath = '/api/v1/location/city';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `locationControllerCreateCity()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateCity$Response(params: { body: CreateCityDto }): Observable<StrictHttpResponse<City>> {
    const rb = new RequestBuilder(this.rootUrl, LocationService.LocationControllerCreateCityPath, 'post');
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
          return r as StrictHttpResponse<City>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `locationControllerCreateCity$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  locationControllerCreateCity(params: { body: CreateCityDto }): Observable<City> {
    return this.locationControllerCreateCity$Response(params).pipe(
      map((r: StrictHttpResponse<City>) => r.body as City)
    );
  }
}
