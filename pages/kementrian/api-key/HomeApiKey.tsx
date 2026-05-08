"use client";

import { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { useApiKeys } from "@/hooks/api-key/useApiKeys";
import { useApiKeyDropdown } from "@/hooks/api-key/useApiKeyDropdown";

import ApiKeyHeaderMenu from "./components/ApiKeyHeaderMenu";
import ApiKeyTable from "./components/ApiKeyTable";
import ApiKeyModal from "@/pages/kementrian/api-key/modal/modal";

import { ApiKeys } from "@/types/api-keys.type";

export default function HomeApiKey() {
  const { apiKeys, setApiKeys, loading, refetch } = useApiKeys();
  const dropdown = useApiKeyDropdown();

  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<ApiKeys | null>(null);

  // 🔥 IMPORTANT: lazy load actions (avoid SSR hook crash)
  const [actions, setActions] = useState<any>(null);

  const loadActions = async () => {
    if (!actions) {
      const mod = await import("@/hooks/api-key/useApiKeyAction");
      setActions(mod.useApiKeyActions(apiKeys, setApiKeys));
    }
  };

  const handleEdit = async (item: ApiKeys) => {
    await loadActions();
    setEditing(item);
    setOpenModal(true);
  };

  const handleAdd = async () => {
    await loadActions();
    setEditing(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditing(null);
  };

  const handleReload = async () => {
    await refetch();
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
          onReload={handleReload}
          onAdd={handleAdd}
        />
      }
    >
      <ApiKeyTable
        apiKeys={apiKeys}
        loading={loading}
        dropdown={dropdown}
        actions={actions || {}}
        onEdit={handleEdit}
      />

      <ApiKeyModal
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={
          editing && actions
            ? (data) => actions.handleUpdate(editing.id, data)
            : actions?.handleCreate || (async () => false)
        }
        editing={editing}
        isSubmitting={actions?.isSubmitting || false}
      />
    </ComponentCard>
  );
}
