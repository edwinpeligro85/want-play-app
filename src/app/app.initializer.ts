import { Store } from '@ngxs/store';
import { Auth } from './auth/state';

export const appInitializer = (store: Store) => {
  return () => {
    return new Promise((resolve) => {
      store
        .dispatch(new Auth.LoadUser())
        .subscribe()
        .add(resolve as any);
    });
  };
};
