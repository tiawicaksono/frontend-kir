"use client";

export const formatTitle = (key: string) => {
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
};

export function generateColumnsFromData(data: any[], config: any) {
  if (!data?.length) return [];

  const keys = Object.keys(data[0]);
  const order = config?.column_order || [];

  const sortedKeys = [...keys].sort((a, b) => {
    const indexA = order.indexOf(a);
    const indexB = order.indexOf(b);

    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return sortedKeys
    .filter((key) => !config?.hidden?.includes(key))
    .map((key) => {
      const searchableConfig = config?.searchable;

      const isSearchable = Array.isArray(searchableConfig)
        ? searchableConfig.length === 0
          ? true
          : searchableConfig.some(
              (item: any) => item.field?.replace(/\./g, "_") === key,
            )
        : true;

      return {
        key,
        title: config?.labels?.[key] || formatTitle(key),
        dataIndex: key,
        sorter: config?.sortable?.includes(key) || false,
        searchable: isSearchable,
      };
    });
}
