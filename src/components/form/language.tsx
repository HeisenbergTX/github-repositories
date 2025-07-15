import { AutocompleteItem, Select } from "@heroui/react";
import { useController, useFormContext } from "react-hook-form";

interface ILanguageSelectProps {
  name: string;
}

export const LanguageSelect = ({ name }: ILanguageSelectProps) => {
  const langs = ["Typescript", "Javascript", "React", "Next", "Python", "Java"];

  const { control } = useFormContext();
  const { field } = useController({ name: name, control });

  return (
    <Select
      {...field}
      className="text-default-700/50"
      label="Выберите язык"
      defaultSelectedKeys={[field.value]}
    >
      {langs.map((lang) => (
        <AutocompleteItem className="text-default-700" key={lang}>
          {lang}
        </AutocompleteItem>
      ))}
    </Select>
  );
};
