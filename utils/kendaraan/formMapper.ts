import dayjs from "dayjs";
import { getAllSchemaFields } from "./schemaHelper";

export const mapApiToForm = (api: any, schema: any[]) => {
  const result: any = {};
  const schemaFields = getAllSchemaFields(schema);

  schemaFields.forEach((field) => {
    let value = api[field];

    if (value === undefined) {
      value = api[`spesifikasi_kendaraan_${field}`];
    }

    if (field.includes("tanggal") && value) {
      value = dayjs(value);
    }

    result[field] = value;
  });

  return result;
};

export const transformValues = (values: any) => {
  const result: any = {};

  Object.keys(values).forEach((key) => {
    const val = values[key];

    if (dayjs.isDayjs(val)) {
      result[key] = val.format("YYYY-MM-DD");
    } else {
      result[key] = val;
    }
  });

  return result;
};
