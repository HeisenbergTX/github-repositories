"use client";

import { useUnit } from "effector-react";
import { useEffect } from "react";

import { Filter, Header, RepoList } from "@/components";
import { SkeletonComponent } from "@/components/skeleton";
import { $isLoading, fetchReposFx } from "@/store/repos";

export default function Home() {
  const isLoading = useUnit($isLoading);

  useEffect(() => {
    fetchReposFx();
  }, []);

  return (
    <div className="relative">
      <Header />
      <RepoList />
      {isLoading && <SkeletonComponent />}
      <Filter />
    </div>
  );
}
