"use client";

import { Button } from "@heroui/react";
import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { LanguageSelect, Order, SortSelect } from "@/components/form";
import {
  $isOpenFilter,
  resetCurrent,
  setFilterStoreFx,
  setOpen,
} from "@/store/filter";
import { $isLoading, fetchReposFx, resetStore } from "@/store/repos";

import { IData } from "./types";

export const sortValues = {
  stars: "Звёздам",
  forks: "Форкам",
  updated: "Обновлениям",
};

export const Filter = () => {
  const filterRef = useRef<HTMLFormElement>(null);
  const isOpenFilter = useUnit($isOpenFilter);
  const isLoading = useUnit($isLoading);
  const methods = useForm<IData>({
    defaultValues: {
      language: "Typescript",
      sort: sortValues.stars,
      order: "desc",
    },
  });

  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<IData> = ({ language, sort, order }) => {
    const sortValue = Object.entries(sortValues).filter(
      ([value]) => value === sort
    )?.[0]?.[0];

    reset();
    resetStore();
    resetCurrent();
    setOpen(false);
    setFilterStoreFx({
      language,
      sort: sortValue,
      order,
    });

    fetchReposFx();
  };

  const resetForm = () => {
    reset();
  };

  const closeFilter = () => {
    setOpen(false);
  };

  const onClickForm = (e: MouseEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpenFilter && window.screen.width < 768) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenFilter || isLoading]);

  return (
    <AnimatePresence>
      {isOpenFilter && (
        <motion.section
          initial={{ opacity: 0, y: 10, paddingTop: 60 }}
          animate={{ opacity: 1, y: 0, paddingTop: 85 }}
          transition={{
            duration: 0.2,
          }}
          exit={{ opacity: 0, y: 10, paddingTop: 60 }}
          onClick={closeFilter}
          className="px-4 top-0 fixed w-screen h-screen z-20 bg-black/15 backdrop-blur-xs md:w-96 md:bg-transparent md:right-0 md:backdrop-blur-none"
        >
          <FormProvider {...methods}>
            <form
              ref={filterRef}
              onSubmit={handleSubmit(submit)}
              onClick={onClickForm}
            >
              <div className="px-2.5 pb-5 rounded-xl border-1 border-default-700/50 border-solid bg-white shadow-xl w-full flex flex-col">
                <Button
                  type="button"
                  onPress={closeFilter}
                  color="danger"
                  variant="light"
                  className="w-fit ml-auto"
                >
                  Закрыть
                </Button>
                <LanguageSelect name="language" />
                <SortSelect name="sort" />
                <Order name="order" />
                <div className="w-full flex justify-end mt-6  gap-2 ">
                  <Button type="submit" variant="bordered" color="primary">
                    Применить
                  </Button>
                  <Button
                    type="button"
                    onPress={resetForm}
                    variant="bordered"
                    color="danger"
                  >
                    Очистить
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </motion.section>
      )}
    </AnimatePresence>
  );
};
