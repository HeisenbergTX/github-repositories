"use client";

import { StarIcon } from "@heroicons/react/24/outline";
import { Image } from "@heroui/react";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { useUnit } from "effector-react";

import { $repos } from "@/store/repos";

import { useGetRequestRepos } from "./useGetRequestRepos";

export const RepoList = () => {
  const repos = useUnit($repos);

  const moreRef = useGetRequestRepos();

  return (
    <div className="px-4">
      {!!repos.length &&
        repos.map((item, index) => {
          const star =
            String(item.stargazers_count).length > 3
              ? String(item.stargazers_count).substring(0, 3) + "k"
              : item.stargazers_count;
          const isRefElement = index === repos.length - 3;

          return (
            <div
              key={item.id}
              ref={isRefElement ? moreRef : null}
              className="w-full h-fit border-1 border-default-700/50 border-solid p-4 my-4 rounded-xl"
            >
              <div className="flex pb-2">
                <Image
                  radius="none"
                  width={32}
                  height={32}
                  src={item.owner.avatar_url}
                />
                <div className="ml-2">{item.full_name}</div>
              </div>
              <p className="text-sm">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item &&
                  item.topics.map((topic) => (
                    <div
                      key={topic}
                      className="w-fit h-fit
                    bg-primary/80 px-2 rounded-xl text-[#f0f6fc] text-small"
                    >
                      {topic}
                    </div>
                  ))}
              </div>
              <div className="mt-2 text-xs text-default-500 flex items-center">
                <div className="pr-2">{item.language}</div>
                <div className="pl-2 flex items-center border-l-1 border-solid border-default-500">
                  <StarIcon width={16} height={16} />
                  <p className="ml-0.5">{star}</p>
                </div>
              </div>
              <div className="mt-1 text-xs text-default-500">
                Обновлено{" "}
                {formatDistance(new Date(item.updated_at), new Date(), {
                  addSuffix: true,
                  locale: ru,
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
};
