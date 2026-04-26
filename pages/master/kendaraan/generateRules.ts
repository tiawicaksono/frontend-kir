export const generateRules = (field: any) => {
  const rules: any[] = [];

  // REQUIRED
  if (field.required) {
    rules.push({
      required: true,
      message: `${field.label} wajib diisi`,
    });
  }

  // INTEGER
  if (field.type === "integer") {
    rules.push({
      validator: (_: any, value: any) => {
        if (value === undefined || value === null || value === "") {
          return Promise.resolve(); // optional field
        }

        if (isNaN(value)) {
          return Promise.reject(`${field.label} harus berupa angka`);
        }

        if (!Number.isInteger(Number(value))) {
          return Promise.reject(`${field.label} harus bilangan bulat`);
        }

        return Promise.resolve();
      },
    });
  }

  // DECIMAL
  if (field.type === "decimal") {
    rules.push({
      validator: (_: any, value: any) => {
        if (value === undefined || value === null || value === "") {
          return Promise.resolve();
        }

        if (isNaN(value)) {
          return Promise.reject(`${field.label} harus berupa angka`);
        }

        return Promise.resolve();
      },
    });
  }

  // MIN
  if (field.min !== undefined) {
    rules.push({
      validator: (_: any, value: any) => {
        if (value === undefined || value === null || value === "") {
          return Promise.resolve();
        }

        if (Number(value) < field.min) {
          return Promise.reject(`${field.label} minimal ${field.min}`);
        }

        return Promise.resolve();
      },
    });
  }

  // MAX
  if (field.max !== undefined) {
    rules.push({
      validator: (_: any, value: any) => {
        if (value === undefined || value === null || value === "") {
          return Promise.resolve();
        }

        if (Number(value) > field.max) {
          return Promise.reject(`${field.label} maksimal ${field.max}`);
        }

        return Promise.resolve();
      },
    });
  }

  return rules;
};
