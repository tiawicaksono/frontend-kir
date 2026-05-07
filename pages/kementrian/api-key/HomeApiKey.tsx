"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useApiKeys } from "@/hooks/api-key/useApiKeys";
import { useApiKeyActions } from "@/hooks/api-key/useApiKeyAction";
import { useApiKeyDropdown } from "@/hooks/api-key/useApiKeyDropdown";
import ApiKeyHeaderMenu from "./components/ApiKeyHeaderMenu";
import ApiKeyTable from "./components/ApiKeyTable";
import { useState } from "react";
import ApiKeyModal from "@/pages/kementrian/api-key/modal/modal";
import { ApiKeys } from "@/types/api-keys.type";

export default function HomeApiKey() {
  const { apiKeys, setApiKeys, loading, refetch } = useApiKeys();
  const actions = useApiKeyActions(apiKeys, setApiKeys);
  const dropdown = useApiKeyDropdown();

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<ApiKeys | null>(null);

  const handleEdit = (item: ApiKeys) => {
    setEditing(item);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEditing(null); // 🔥 penting
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditing(null); // 🔥 reset biar tidak ke-carry
  };

  return (
    <ComponentCard
      title={
        <div className="flex items-baseline gap-2">
          <span>API Keys</span>
          <span className="text-xs lowercase text-red-500">
            *maksimal 1 api key aktif.
          </span>
        </div>
      }
      desc="API Key digunakan untuk sinkron data dengan aplikasi kementrian."
      headerRight={
        <ApiKeyHeaderMenu
          isOpen={dropdown.isHeaderOpen}
          onToggle={dropdown.toggleHeader}
          onClose={dropdown.closeHeader}
          onReload={refetch}
          onAdd={handleAdd} // 🔥 pakai ini
        />
      }
    >
      <ApiKeyTable
        apiKeys={apiKeys}
        loading={loading}
        dropdown={dropdown}
        actions={actions}
        onEdit={handleEdit}
      />

      <ApiKeyModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={
          editing
            ? (data) => actions.handleUpdate(editing.id, data)
            : actions.handleCreate
        }
        editing={editing}
        isSubmitting={actions.isSubmitting}
      />
    </ComponentCard>
  );
}
