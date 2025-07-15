import { createEffect, createEvent, createStore } from "effector";

import { api } from "@/api";

import { $currentPage, $filterStore } from "./filter";
import { IRepos } from "./types";

export const $repos = createStore<IRepos[]>([]);
export const $reposError = createStore<null | string>(null);

export const resetStore = createEvent();
export const setError = createEvent<null | string>();

export const fetchReposFx = createEffect(async () => {
  const page = $currentPage.getState();
  const { language, sort, order } = $filterStore.getState();

  try {
    setError(null);
    const response = await api.get("/search/repositories", {
      params: {
        q: language.toLowerCase(),
        sort: sort,
        order: order,
        per_page: "20",
        page,
      },
    });

    if (!response?.data?.items?.length) {
      setError(
        "Упс, по такому запросу ничего не нашлось. Попробуйте ввести другой запрос или воспользуйтесь фильтром."
      );
      throw new Error("Reponse is not iterable");
    }
    return response?.data?.items;
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error(error.message);
    }
  }
});

export const $isLoading = fetchReposFx.pending.map((isPending) => isPending);

$repos.on(fetchReposFx.doneData, (state, repos) => [...state, ...repos]);
$repos.reset(resetStore);

$reposError.on(setError, (state, payload) => (state = payload));
