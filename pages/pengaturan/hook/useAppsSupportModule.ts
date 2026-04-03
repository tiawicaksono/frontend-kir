import { useEffect } from "react";
import { useAppsSupportTable } from "./useAppsSupportTable";
import { useAppsSupportAction } from "./useAppsSupportAction";

export function useAppsSupportModule({
  fetcher,
  service,
  label,
  loadCounts,
}: any) {
  const table = useAppsSupportTable(fetcher);
  const primaryKey = table.config.primary_key;

  const {
    handleCreate,
    handleUpdate: rawUpdate,
    handleDelete,
  } = useAppsSupportAction(
    service,
    label,
    async (newData: any) => {
      table.prependData(newData);
      await loadCounts();
    },
    (updatedData: any) => {
      table.updateData?.(updatedData);
    },
    primaryKey,
  );

  const handleDeleteWrapper = async (id: string) => {
    const success = await handleDelete(id);

    if (success) {
      await loadCounts();
    }
  };

  const handleReload = async () => {
    await Promise.all([table.fetchData(), loadCounts()]);
  };

  useEffect(() => {
    table.fetchData();
  }, [table.params]);

  return {
    table,
    handleCreate,
    handleUpdate: rawUpdate,
    handleDeleteWrapper,
    handleReload,
  };
}
