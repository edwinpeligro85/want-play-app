import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { environment } from '@env/environment';
import { PostsState } from './modules/post/state';

export const STORE_CONFIG = [
  NgxsModule.forRoot([PostsState], { developmentMode: !environment.production }),
  NgxsReduxDevtoolsPluginModule.forRoot({
    disabled: environment.production,
  }),
  NgxsLoggerPluginModule.forRoot({
    disabled: environment.production,
  }),
];
