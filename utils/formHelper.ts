// /utils/formHelper.ts

import dayjs from "dayjs";

import { getAllSchemaFields } from "./for-schema/schemaHelper";

// ====================================
// API -> FORM
// ====================================

export const mapApiToForm = (api: any, schema: any[]) => {
  const result: any = {};

  const schemaFields = getAllSchemaFields(schema);

  schemaFields.forEach((field) => {
    let value = api?.[field];

    // fallback spesifikasi_kendaraan_xxx
    if (value === undefined) {
      value = api?.[`spesifikasi_kendaraan_${field}`];
    }

    // auto parse tanggal
    if (typeof field === "string" && field.includes("tanggal") && value) {
      value = dayjs(value);
    }

    result[field] = value;
  });

  return result;
};

// ====================================
// FORM -> API
// ====================================

export const transformValues = (values: any) => {
  const result: any = {};

  Object.keys(values || {}).forEach((key) => {
    const val = values[key];

    // dayjs
    if (dayjs.isDayjs(val)) {
      result[key] = val.format("YYYY-MM-DD");
    }

    // empty string -> null
    else if (val === "") {
      result[key] = null;
    }

    // undefined -> null
    else if (val === undefined) {
      result[key] = null;
    } else {
      result[key] = val;
    }
  });

  return result;
};

// ====================================
// MERGE API + FORM
// ====================================

export const mergePayload = (api: any, values: any) => {
  return {
    ...api,
    ...transformValues(values),
  };
};
