import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";

import { $currentPage, $filterStore } from "./filter";
import { IRepos } from "./types";

export const $repos = createStore<IRepos[]>([]);
export const $reposError = createStore(null);

export const resetStore = createEvent();

export const fetchReposFx = createEffect(async () => {
  const page = $currentPage.getState();
  const { language, per_page, sort } = $filterStore.getState();

  const response = await axios
    .get(
      `https://api.github.com/search/repositories?q=${language.toLowerCase()}&sort=stars&order=${sort}&per_page=${per_page}&page=${page}`
    )
    .then((response) => response.data)
    .catch((error) => console.error("Error: ", error.message));

  return response?.items;
});

export const $isLoading = fetchReposFx.pending.map((isPending) => isPending);

$repos.on(fetchReposFx.doneData, (state, repos) => [...state, ...repos]);

$repos.reset(resetStore);
