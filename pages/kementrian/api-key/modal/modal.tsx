"use client";

import { useModal } from "@/core/modal/modal.hook";

import { ApiKeys } from "@/types/api-keys.type";

import ApiKeyForm from "@/pages/kementrian/api-key/modal/modal.form";

interface Props {
  editing?: ApiKeys | null;

  onSubmit: (data: {
    name: string;
    urlApi: string;
    token: string;
  }) => Promise<boolean>;

  isSubmitting?: boolean;
}

export default function ApiKeyModal({
  editing,
  onSubmit,
  isSubmitting,
}: Props) {
  const { closeModal } = useModal();

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">
        {editing ? "Edit API Key" : "Create API Key"}
      </h2>

      <ApiKeyForm
        key={editing?.id ?? "create"}
        data={editing}
        isSubmitting={isSubmitting}
        onSubmit={async (form) => {
          const success = await onSubmit(form);

          if (success) {
            closeModal();
          }

          return success;
        }}
      />
    </>
  );
}
