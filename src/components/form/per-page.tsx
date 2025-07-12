import { Radio, RadioGroup } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

interface IPerPageProps {
  name: string;
}

export const PerPage = ({ name }: IPerPageProps) => {
  const { control } = useFormContext();
  const { field } = useController({ name, control });
  return (
    <RadioGroup
      {...field}
      label="Количество на странице"
      orientation="horizontal"
    >
      <Radio className="mr-2" value="20">
        20
      </Radio>
      <Radio className="mr-2" value="40">
        40
      </Radio>
      <Radio value="60">60</Radio>
    </RadioGroup>
  );
};
