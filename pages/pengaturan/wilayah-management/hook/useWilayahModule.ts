import { useEffect } from "react";
import { useWilayahTable } from "./useWilayahTable";
import { useWilayahAction } from "./useWilayahAction";

export function useWilayahModule({ fetcher, service, label, loadCounts }: any) {
  const table = useWilayahTable(fetcher);

  const { handleCreate, handleUpdate, handleDelete } = useWilayahAction(
    service,
    label,
    async (newData: any) => {
      table.prependData(newData);
      await loadCounts();
    },
    (updatedData: any) => {
      table.updateData?.(updatedData);
    },
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
    handleUpdate,
    handleDeleteWrapper,
    handleReload,
  };
}
