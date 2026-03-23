"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useApiKeys } from "./hook/useApiKeys";
import { useApiKeyActions } from "./hook/useApiKeyAction";
import { useApiKeyDropdown } from "./hook/useApiKeyDropdown";
import ApiKeyHeaderMenu from "./components/ApiKeyHeaderMenu";
import ApiKeyTable from "./components/ApiKeyTable";
import { useState } from "react";
import ApiKeyModal from "@/components/pages/pengaturan/api-key/modal/modal";
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

  return (
    <ComponentCard
      title="API Keys"
      desc="API keys are used to authentication requests to the tailadmin API"
      headerRight={
        <ApiKeyHeaderMenu
          isOpen={dropdown.isHeaderOpen}
          onToggle={dropdown.toggleHeader}
          onClose={dropdown.closeHeader}
          onReload={refetch}
          onAdd={() => setOpenModal(true)}
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
        onClose={() => setOpenModal(false)}
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
