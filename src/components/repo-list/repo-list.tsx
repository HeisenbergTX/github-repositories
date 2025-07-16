"use client";

import {
  StarIcon,
  ChevronUpIcon,
  DocumentDuplicateIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import { Image, Link } from "@heroui/react";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { setValue } from "@/store/inputStore";
import { $repos, $reposError } from "@/store/repos";

import { useGetRequestRepos } from "./useGetRequestRepos";

export const RepoList = () => {
  const repos = useUnit($repos);
  const [isVisible, setVisible] = useState(false);

  const errorMessage = useUnit($reposError);
  const moreRef = useGetRequestRepos();

  const handleClickValue = (topic: string) => setValue(topic);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="px-4">
      {repos.length ? (
        repos.map((item, index) => {
          const star =
            String(item.stargazers_count).length > 3
              ? String(item.stargazers_count).substring(0, 3) + "k"
              : item.stargazers_count;
          const fork =
            String(item.forks_count).length > 3
              ? String(item.forks_count).substring(0, 3) + "k"
              : item.forks_count;

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
                <div className="ml-2">
                  {item.owner.login} -{" "}
                  <Link target="_blank" href={item.html_url}>
                    {item.name}
                    <LinkIcon
                      width={12}
                      height={12}
                      className="text-primary ml-0.5 mt-0.5"
                    />
                  </Link>
                </div>
              </div>
              <p className="text-sm">{item.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {item &&
                  item.topics.map((topic) => (
                    <div
                      key={topic}
                      onClick={handleClickValue.bind(null, topic)}
                      className="w-fit h-fit
                    bg-primary/80 px-2 rounded-xl text-[#f0f6fc] text-small cursor-pointer"
                    >
                      {topic}
                    </div>
                  ))}
              </div>
              <div className="mt-2 text-xs text-default-500 flex items-center">
                <div className="pr-2">{item.language}</div>
                <div className="px-2 flex items-center border-l-1 border-solid border-default-500">
                  <StarIcon width={16} height={16} />
                  <p className="ml-0.5">{star}</p>
                </div>
                <div className="pl-2 flex items-center border-l-1 border-solid border-default-500">
                  <DocumentDuplicateIcon width={16} height={16} />
                  <p className="ml-0.5">{fork}</p>
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
        })
      ) : (
        <p className="text-medium text-wrap text-center text-default-500">
          {errorMessage}
        </p>
      )}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bg-[#338cf1] bottom-20 right-6 rounded-full p-2 z-50 cursor-pointer"
          >
            <ChevronUpIcon color="white" width={24} height={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
