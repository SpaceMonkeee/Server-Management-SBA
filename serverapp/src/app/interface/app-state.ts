import { DataState } from './../enum/data-state.enum';
export interface AppState<T> {
    dataState: DataState; //can call this any time to find current app state
    appData?: T;
    error?: string;
}