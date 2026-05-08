export const getAllSchemaFields = (schema: any[]) => {
  const fields: string[] = [];

  schema.forEach((step) => {
    step.sections.forEach((section: any) => {
      section.rows?.forEach((row: any) => {
        row.cols.forEach((col: any) => {
          if (col.field) fields.push(col.field.name);
        });
      });

      section.fields?.forEach((f: any) => {
        if (f.name) fields.push(f.name);
      });
    });
  });

  return fields;
};

export const extractFieldsFromSection = (section: any): string[] => {
  const result: string[] = [];

  section.rows?.forEach((row: any) => {
    row.cols.forEach((col: any) => {
      if (col.field) result.push(col.field.name);
    });
  });

  section.fields?.forEach((f: any) => {
    if (f.name) result.push(f.name);
  });

  return result;
};
