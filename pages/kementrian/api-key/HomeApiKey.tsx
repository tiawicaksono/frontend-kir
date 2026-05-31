"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useApiKeys } from "@/hooks/api-key/useApiKeys";
import { useApiKeyDropdown } from "@/hooks/api-key/useApiKeyDropdown";

import ApiKeyHeaderMenu from "./components/ApiKeyHeaderMenu";
import ApiKeyTable from "./components/ApiKeyTable";
import ApiKeyModal from "@/pages/kementrian/api-key/modal/modal";

import { ApiKeys } from "@/types/api-keys.type";
import { useModal } from "@/core/modal/modal.hook";
import { useApiKeyActions } from "@/hooks/api-key/useApiKeyAction";

export default function HomeApiKey() {
  const { apiKeys, setApiKeys, loading, refetch } = useApiKeys();
  const actions = useApiKeyActions(apiKeys, setApiKeys);
  const dropdown = useApiKeyDropdown();
  const { openModal } = useModal();

  const handleAdd = () => {
    openModal({
      className: "max-w-lg",
      content: (
        <ApiKeyModal
          onSubmit={actions.handleCreate}
          isSubmitting={actions.isSubmitting}
        />
      ),
    });
  };

  const handleEdit = (item: ApiKeys) => {
    openModal({
      className: "max-w-lg",
      content: (
        <ApiKeyModal
          editing={item}
          isSubmitting={actions.isSubmitting}
          onSubmit={(data) => actions.handleUpdate(item.id, data)}
        />
      ),
    });
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
      extra={
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
        actions={actions}
        onEdit={handleEdit}
      />
    </ComponentCard>
  );
}
