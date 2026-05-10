export type FieldType =
  | "text"
  | "integer"
  | "decimal"
  | "date"
  | "select"
  | "textarea"
  | "checkbox"
  | "radio"
  | "custom"
  | "search";

export type OptionType = {
  label: string;
  value: string | number | boolean;
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
  span?: number;
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  hidden?: boolean;
  rows?: number;
  visible?: (values: any) => boolean;
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
