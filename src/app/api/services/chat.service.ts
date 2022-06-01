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
import { CreateChatDto } from '../models/create-chat-dto';
import { CreateMessageDto } from '../models/create-message-dto';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation chatControllerCreateChat
   */
  static readonly ChatControllerCreateChatPath = '/api/v1/chats';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chatControllerCreateChat()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  chatControllerCreateChat$Response(params: { body: CreateChatDto }): Observable<StrictHttpResponse<Chat>> {
    const rb = new RequestBuilder(this.rootUrl, ChatService.ChatControllerCreateChatPath, 'post');
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
          return r as StrictHttpResponse<Chat>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `chatControllerCreateChat$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  chatControllerCreateChat(params: { body: CreateChatDto }): Observable<Chat> {
    return this.chatControllerCreateChat$Response(params).pipe(map((r: StrictHttpResponse<Chat>) => r.body as Chat));
  }

  /**
   * Path part for operation chatControllerGetMessages
   */
  static readonly ChatControllerGetMessagesPath = '/api/v1/chats/{id}/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chatControllerGetMessages()` instead.
   *
   * This method doesn't expect any request body.
   */
  chatControllerGetMessages$Response(params: { id: string }): Observable<StrictHttpResponse<Array<Message>>> {
    const rb = new RequestBuilder(this.rootUrl, ChatService.ChatControllerGetMessagesPath, 'get');
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
          return r as StrictHttpResponse<Array<Message>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `chatControllerGetMessages$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  chatControllerGetMessages(params: { id: string }): Observable<Array<Message>> {
    return this.chatControllerGetMessages$Response(params).pipe(
      map((r: StrictHttpResponse<Array<Message>>) => r.body as Array<Message>)
    );
  }

  /**
   * Path part for operation chatControllerCreateMessage
   */
  static readonly ChatControllerCreateMessagePath = '/api/v1/chats/{id}/messages';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `chatControllerCreateMessage()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  chatControllerCreateMessage$Response(params: {
    id: string;
    body: CreateMessageDto;
  }): Observable<StrictHttpResponse<Message>> {
    const rb = new RequestBuilder(this.rootUrl, ChatService.ChatControllerCreateMessagePath, 'post');
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
          return r as StrictHttpResponse<Message>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `chatControllerCreateMessage$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  chatControllerCreateMessage(params: { id: string; body: CreateMessageDto }): Observable<Message> {
    return this.chatControllerCreateMessage$Response(params).pipe(
      map((r: StrictHttpResponse<Message>) => r.body as Message)
    );
  }
}
