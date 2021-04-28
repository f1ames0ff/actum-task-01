import { appStore } from "../store/store";

export type AppState = ReturnType<typeof appStore.getState>;
