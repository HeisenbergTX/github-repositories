"use client";

import { Button } from "@heroui/react";
import { useUnit } from "effector-react";
import { AnimatePresence, motion } from "framer-motion";
import { MouseEvent, TouchEvent, useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { LanguageSelect, PerPage, Sort } from "@/components/form";
import {
  $isOpenFilter,
  resetCurrent,
  setFilterStoreFx,
  setOpen,
} from "@/store/filter";
import { $isLoading, fetchReposFx, resetStore } from "@/store/repos";


import { IData } from "./types";

export const Filter = () => {
  const filterRef = useRef<HTMLFormElement>(null);
  const isOpenFilter = useUnit($isOpenFilter);
  const isLoading = useUnit($isLoading);
  const methods = useForm<IData>({
    defaultValues: {
      language: "Typescript",
      sort: "desc",
      per_page: "20",
    },
  });

  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<IData> = ({ language, sort, per_page }) => {
    reset();
    resetStore();
    resetCurrent();
    setOpen(false);
    setFilterStoreFx({
      language,
      sort,
      per_page,
    });

    fetchReposFx();
  };

  const resetForm = () => {
    reset();
  };

  const closeFilter = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpenFilter && window.screen.height < 768) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenFilter || isLoading]);

  const handleClickOutside = (
    event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>
  ) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

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
          onClick={handleClickOutside}
          onMouseDown={handleClickOutside}
          onTouchStart={handleClickOutside}
          className="px-4 top-0 fixed w-screen h-screen z-20 bg-black/15 backdrop-blur-xs md:w-96 md:bg-transparent md:right-0 md:backdrop-blur-none"
        >
          <FormProvider {...methods}>
            <form ref={filterRef} onSubmit={handleSubmit(submit)}>
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
                <Sort name="sort" />
                <PerPage name="per_page" />
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
