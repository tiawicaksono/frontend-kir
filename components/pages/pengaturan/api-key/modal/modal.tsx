"use client";

import { Modal } from "@/components/ui/modal";
import { ApiKeys } from "@/types/api-keys.type";
import ApiKeyForm from "@/components/pages/pengaturan/api-key/modal/modal.form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editing?: ApiKeys | null;
  onSubmit: (data: {
    name: string;
    urlApi: string;
    token: string;
  }) => Promise<boolean>;
  isSubmitting?: boolean;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  editing,
  onSubmit,
  isSubmitting,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg">
      <h2 className="text-lg font-semibold mb-4">
        {editing ? "Edit API Key" : "Create API Key"}
      </h2>

      <ApiKeyForm
        data={editing}
        isSubmitting={isSubmitting}
        onSubmit={async (form) => {
          const success = await onSubmit(form);
          if (success) onClose();
        }}
      />
    </Modal>
  );
}
