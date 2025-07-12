import { Radio, RadioGroup } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

interface ISortProps {
  name: string;
}

export const Sort = ({ name }: ISortProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <RadioGroup
      {...field}
      label="Сортировать по:"
      className="my-4"
      orientation="horizontal"
    >
      <Radio value="desc">убыванию</Radio>
      <Radio className="mr-2" value="asc">
        возрастанию
      </Radio>
    </RadioGroup>
  );
};
