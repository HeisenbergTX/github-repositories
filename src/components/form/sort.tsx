import { AutocompleteItem, Select } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

import { sortValues } from "../filter/filter";

interface ISortSelectProps {
  name: string;
}

export const SortSelect = ({ name }: ISortSelectProps) => {
  const sorts = [sortValues.stars, sortValues.forks, sortValues.updated];

  const { control } = useFormContext();
  const { field } = useController({ name: name, control });

  return (
    <Select
      {...field}
      className="text-default-700/50 mt-4"
      label="Фильтровать по"
      variant="bordered"
      defaultSelectedKeys={[field.value]}
    >
      {sorts.map((sort) => (
        <AutocompleteItem className="text-default-700" key={sort}>
          {sort}
        </AutocompleteItem>
      ))}
    </Select>
  );
};
