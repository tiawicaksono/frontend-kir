// ====================================
// GET ALL FIELDS
// support:
// - steps.sections.rows.cols.field
// - sections.fields
// ====================================

export const getAllSchemaFields = (schema: any[]): string[] => {
  if (!Array.isArray(schema)) {
    return [];
  }

  const result: string[] = [];

  schema.forEach((item: any) => {
    // ====================================
    // STEP MODE
    // ====================================

    if (item.sections) {
      item.sections.forEach((section: any) => {
        result.push(...extractSectionFields(section));
      });
    }

    // ====================================
    // SECTION MODE
    // ====================================
    else {
      result.push(...extractSectionFields(item));
    }
  });

  return [...new Set(result)];
};

// ====================================
// EXTRACT FIELD FROM SECTION
// ====================================

export const extractSectionFields = (section: any): string[] => {
  const result: string[] = [];

  // ====================================
  // SIMPLE FIELD MODE
  // section.fields
  // ====================================

  section.fields?.forEach((field: any) => {
    if (field?.name) {
      result.push(field.name);
    }
  });

  // ====================================
  // GRID MODE
  // section.rows.cols.field
  // ====================================

  section.rows?.forEach((row: any) => {
    row.cols?.forEach((col: any) => {
      if (col.field?.name) {
        result.push(col.field.name);
      }
    });
  });

  return result;
};
