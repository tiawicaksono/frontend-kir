export const formatTitle = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export const generateColumnsFromData = (data: any[], config?: any) => {
  if (!data.length) return [];

  return Object.keys(data[0])
    .filter((key) => !config?.hidden?.includes(key))
    .filter((key) => !config?.foreign_keys?.includes(key))
    .map((key) => {
      const uniqueValues = [...new Set(data.map((item) => item[key]))].filter(
        Boolean,
      );

      return {
        title: config?.labels?.[key] || formatTitle(key),
        dataIndex: key,
        key,
        sorter: true,
        // filters:
        //   uniqueValues.length <= 10
        //     ? uniqueValues.map((val) => ({
        //         text: String(val),
        //         value: val,
        //       }))
        //     : null,
      };
    });
};
