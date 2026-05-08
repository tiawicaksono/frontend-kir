export type FieldType = "text" | "integer" | "decimal" | "date" | "select";

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
  suffix?: string;
};

export type ColSchema = {
  span: number;
  field?: FieldSchema;
  children?: ColSchema[];
};

export type RowSchema = {
  cols: ColSchema[];
};

export type SectionSchema = {
  title: string;
  fields?: FieldSchema[]; // fallback lama
  rows?: RowSchema[]; // versi baru
};

export type StepSchema = {
  title: string;
  sections: SectionSchema[];
};
