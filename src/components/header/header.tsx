"use client";

import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input } from "@heroui/react";
import { useUnit } from "effector-react";
import { motion } from "framer-motion";
import { ChangeEvent } from "react";

import {
  $filterStore,
  resetCurrent,
  setFilterStoreFx,
  setOpen,
} from "@/store/filter";
import { $inputStore, clearInput, setValue } from "@/store/inputStore";
import { fetchReposFx, resetStore } from "@/store/repos";

export const Header = () => {
  const value = useUnit($inputStore);
  const { sort, order } = useUnit($filterStore);

  const setOpenFilter = () => {
    setOpen(true);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnPress = () => {
    setFilterStoreFx({
      language: value,
      sort: sort,
      order: order,
    });
    resetCurrent();
    resetStore();
    fetchReposFx();
    clearInput();
  };

  return (
    <header className="flex justify-between items-center p-4">
      <Input
        placeholder="Type to search..."
        radius="lg"
        size="lg"
        value={value}
        onChange={handleInputChange}
        classNames={{
          input: ["bg-transparent", "placeholder:text-default-700/50"],
        }}
        startContent={
          <MagnifyingGlassIcon className="text-slate-400 pointer-events-none flex-shrink-0 w-5 h-5" />
        }
        endContent={
          value && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                onPress={handleOnPress}
                size="sm"
                variant="bordered"
                className="border-primary/80 text-primary/80"
              >
                Поиск
              </Button>
            </motion.div>
          )
        }
      />
      <div onClick={setOpenFilter} className="cursor-pointer">
        <FunnelIcon className="w-6 h-6 ml-4 text-slate-400 pointer-events-none flex-shrink-0" />
      </div>
    </header>
  );
};
