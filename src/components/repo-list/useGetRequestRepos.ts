import { useUnit } from "effector-react";
import { RefCallback, useCallback, useRef } from "react";

import { setCurrentPage } from "@/store/filter";
import { $isLoading, fetchReposFx } from "@/store/repos";

export const useGetRequestRepos = () => {
  const isLoading = useUnit($isLoading);
  const observer = useRef<IntersectionObserver>(null);

  const moreSeasonsRef: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage();
          fetchReposFx();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, fetchReposFx]
  );

  return moreSeasonsRef;
};
