"use client";

import { Modal } from "@/components/ui/modal";
import { ApiKeys } from "@/types/api-keys.type";
import ApiKeyForm from "@/components/pages/api-key/modal/modal.form";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editing?: ApiKeys | null;
  onSubmit: (data: { name: string; urlApi: string; token: string }) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  editing,
  onSubmit,
}: Props) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        {editing ? "Edit API Key" : "Create API Key"}
      </h2>

      <ApiKeyForm
        data={editing}
        onSubmit={(form) => {
          onSubmit(form);
          onClose();
        }}
      />
    </Modal>
  );
}
