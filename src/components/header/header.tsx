"use client";

import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@heroui/react";

import { setOpen } from "@/store/filter";

export const Header = () => {
  const setOpenFilter = () => {
    setOpen(true);
  };

  return (
    <header className="flex justify-between items-center p-4">
      <Input
        placeholder="Type to search..."
        radius="lg"
        size="lg"
        classNames={{
          input: ["bg-transparent", "placeholder:text-default-700/50 "],
        }}
        startContent={
          <MagnifyingGlassIcon className="text-black/50 text-slate-400 pointer-events-none flex-shrink-0 w-5 h-5" />
        }
      />
      <div onClick={setOpenFilter} className="cursor-pointer">
        <FunnelIcon className="w-6 h-6 ml-4 text-black/50 text-slate-400 pointer-events-none flex-shrink-0" />
      </div>
    </header>
  );
};
