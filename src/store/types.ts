import { index } from './index';

export type RootState = ReturnType<typeof index.getState>;
export type AppDispatch = typeof index.dispatch;
