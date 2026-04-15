import { Dispatch, SetStateAction, useState } from "react";
import {
  updateApiKeyStatus,
  deleteApiKey,
  createApiKey,
  updateApiKey,
} from "@/services/api-keys.service";
import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";
import { ApiKeys } from "@/types/api-keys.type";

export function useApiKeyActions(
  apiKeys: ApiKeys[],
  setApiKeys: Dispatch<SetStateAction<ApiKeys[]>>,
) {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);
  const { confirm } = useConfirm();
  const { showErrorAlert, showSuccessAlert } = useShowAlert();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = async (id: number, value: boolean) => {
    setLoadingId(id);

    const previous = apiKeys;

    // 🔥 CASE: Aktifkan → semua jadi false kecuali yang dipilih
    if (value) {
      setApiKeys(
        apiKeys.map((i) => ({
          ...i,
          isActive: i.id === id,
        })),
      );
    }

    // 🔥 CASE: Nonaktifkan → normal (biar backend validasi)
    else {
      setApiKeys(
        apiKeys.map((i) => (i.id === id ? { ...i, isActive: false } : i)),
      );
    }

    try {
      await updateApiKeyStatus(id, value);
      showSuccessAlert("Status berhasil diubah");
    } catch (err) {
      // rollback kalau gagal
      setApiKeys(previous);
      showErrorAlert(err, "Status gagal diubah");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Hapus API Key",
      message: "Data yang dihapus tidak bisa dikembalikan.",
      confirmText: "Hapus",
      variant: "destructive",
    });

    if (!confirmed) return;

    setLoadingDeleteId(id);
    const previous = apiKeys;

    setApiKeys(apiKeys.filter((i) => i.id !== id));

    try {
      await deleteApiKey(id);
      showSuccessAlert("Data berhasil dihapus");
    } catch (err) {
      setApiKeys(previous);
      showErrorAlert(err, "Data gagal dihapus");
    } finally {
      setLoadingDeleteId(null);
    }
  };

  const handleCreate = async (data: {
    name: string;
    urlApi: string;
    token: string;
  }) => {
    try {
      setIsSubmitting(true);
      const newItem = await createApiKey(data);
      setApiKeys((prev) => [newItem, ...prev]);
      showSuccessAlert("API Key berhasil dibuat");
      return true;
    } catch (err) {
      showErrorAlert(err, "API Key gagal dibuat");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (
    id: number,
    data: {
      name: string;
      urlApi: string;
      token: string;
    },
  ): Promise<boolean> => {
    const previous = apiKeys;

    setApiKeys(
      apiKeys.map((i) =>
        i.id === id
          ? {
              ...i,
              name: data.name,
              urlApi: data.urlApi,
              token: data.token,
            }
          : i,
      ),
    );

    try {
      setIsSubmitting(true);
      await updateApiKey(id, data);
      showSuccessAlert("API Key berhasil diupdate");
      return true;
    } catch (err) {
      setApiKeys(previous);
      showErrorAlert(err, "API Key gagal diupdate");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleToggle,
    handleDelete,
    handleCreate,
    handleUpdate,
    loadingId,
    loadingDeleteId,
    isSubmitting,
  };
}
