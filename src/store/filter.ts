import { createEffect, createEvent, createStore } from "effector";

export const resetCurrent = createEvent();
export const setCurrentPage = createEvent();
export const setOpen = createEvent<boolean>();

export const $currentPage = createStore(1);
export const $isOpenFilter = createStore<boolean>(false);
export const $filterStore = createStore({
  language: "Typescript",
  sort: "stars",
  order: "desc",
});

interface IParams {
  language: string;
  sort: string;
  order: string;
}

export const setFilterStoreFx = createEffect((params: IParams) => params);

$isOpenFilter.on(setOpen, (_, payload) => payload);
$filterStore.on(setFilterStoreFx.doneData, (_, payload) => payload);
$currentPage
  .on(setCurrentPage, (state) => (state = state + 1))
  .reset(resetCurrent);
