import { useEffect } from "react";
import { useKendaraanTable } from "./useKendaraanTable";
import { useKendaraanAction } from "./useKendaraanAction";

export function useKendaraanModule({
  fetcher,
  service,
  label,
  loadCounts,
}: any) {
  const table = useKendaraanTable(fetcher);
  const primaryKey = table.config.primary_key;

  const {
    handleCreate,
    handleUpdate: rawUpdate,
    handleDelete,
  } = useKendaraanAction(
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
