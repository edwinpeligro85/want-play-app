import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';
import { environment } from '@env/environment';
import { PostsState } from './modules/post/state';
import { AuthState } from './auth/state';
import { ChatState } from './modules/chat/state';

export const STORE_CONFIG = [
  NgxsModule.forRoot([AuthState, PostsState, ChatState], { developmentMode: !environment.production }),
  NgxsStoragePluginModule.forRoot({
    key: ['auth.token'],
  }),
  NgxsResetPluginModule.forRoot(),
  NgxsSelectSnapshotModule.forRoot(),
  NgxsReduxDevtoolsPluginModule.forRoot({
    disabled: environment.production,
  }),
  NgxsLoggerPluginModule.forRoot({
    disabled: environment.production,
  }),
];
