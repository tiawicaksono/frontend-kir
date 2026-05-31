"use client";

import { useState } from "react";

import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import { CrudService, PrimaryKey } from "@/types/kendaraan.type";

interface Props<T> {
  service: CrudService<T>;

  label: string;

  primaryKey?: keyof T;

  prependData?: (data: T) => void;

  updateData?: (data: Partial<T>) => void;

  removeData?: (id: PrimaryKey) => void;
}

export function useKendaraanAction<T extends Record<string, any>>({
  service,
  label,
  primaryKey = "id" as keyof T,
  prependData,
  updateData,
  removeData,
}: Props<T>) {
  const { confirm } = useConfirm();

  const { showSuccessAlert, showErrorAlert } = useShowAlert();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const execute = async (
    callback: () => Promise<any>,
    successMessage: string,
    errorMessage: string,
  ) => {
    try {
      setIsSubmitting(true);

      const result = await callback();

      showSuccessAlert(successMessage);

      return result;
    } catch (error) {
      showErrorAlert(error, errorMessage);

      return null;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreate = async (data: T) => {
    const result = await execute(
      () => service.create(data),
      `${label} berhasil dibuat`,
      `${label} gagal dibuat`,
    );

    if (!result) return false;

    prependData?.(result?.data ?? result);

    return true;
  };

  const handleUpdate = async (data: T) => {
    const id = data[primaryKey] as PrimaryKey;

    const result = await execute(
      () => service.update(id, data),
      `${label} berhasil diupdate`,
      `${label} gagal diupdate`,
    );

    if (!result) return false;

    updateData?.(result?.data ?? result);

    return true;
  };

  const handleDelete = async (id: PrimaryKey) => {
    const confirmed = await confirm({
      title: `Hapus ${label}`,
      message: `Yakin ingin menghapus ${label.toLowerCase()} ini?`,
      confirmText: "Hapus",
      cancelText: "Batal",
      variant: "destructive",
    });

    if (!confirmed) return false;

    const result = await execute(
      () => service.delete(id),
      `${label} berhasil dihapus`,
      `${label} gagal dihapus`,
    );

    if (!result) return false;

    removeData?.(id);

    return true;
  };

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isSubmitting,
  };
}
