import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsWebsocketPluginModule } from '@ngxs/websocket-plugin';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { environment } from '@env/environment';
import { PostsState } from './modules/post/state';
import { AuthState } from './auth/state';

export const STORE_CONFIG = [
  NgxsModule.forRoot([AuthState, PostsState], { developmentMode: !environment.production }),
  NgxsStoragePluginModule.forRoot({
    key: ['auth.token'],
  }),
  NgxsResetPluginModule.forRoot(),
  NgxsWebsocketPluginModule.forRoot({
    url: environment.serverUrl,
  }),
  NgxsReduxDevtoolsPluginModule.forRoot({
    disabled: environment.production,
  }),
  NgxsLoggerPluginModule.forRoot({
    disabled: environment.production,
  }),
];
