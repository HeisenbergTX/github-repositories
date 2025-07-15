import { createEvent, createStore } from "effector";

export const setValue = createEvent<string>();
export const clearInput = createEvent();

export const $inputStore = createStore<string>("");

$inputStore.on(setValue, (_, payload) => payload);

$inputStore.reset(clearInput);
