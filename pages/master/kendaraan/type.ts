export type FieldType = "text" | "number" | "date" | "select";

export type OptionType = {
  label: string;
  value: string | number;
};

export type FieldSchema = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  default?: any;
  options?: OptionType[];
  uppercase?: boolean;
};

export type SectionSchema = {
  title: string;
  fields: FieldSchema[];
};

export type StepSchema = {
  title: string;
  sections: SectionSchema[];
};
