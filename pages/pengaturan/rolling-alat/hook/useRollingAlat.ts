import { useEffect, useState } from "react";
import { message } from "antd";
import type { Key } from "react";
import {
  saveRollingAlat,
  RollingAlatItem,
  getRollingAlatByGedung,
  getRollingAlatFull,
} from "@/services/rolling-alat.service";
import { useShowAlert } from "@/core/alert/alert.hook";

export function useRollingAlat() {
  const [data, setData] = useState<RollingAlatItem[]>([]);
  const [targetKeys, setTargetKeys] = useState<Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [loadingRight, setLoadingRight] = useState(false);

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const from = 1;
  const to = 2;

  // =========================
  // INITIAL LOAD
  // =========================
  const fetchData = async (): Promise<void> => {
    setLoading(true);
    try {
      const res: RollingAlatItem[] = await getRollingAlatFull(from, to);

      setData(res);

      setTargetKeys(
        res
          .filter((item: RollingAlatItem) => item.direction === "right")
          .map((item: RollingAlatItem) => item.key),
      );
    } catch {
      message.error("Gagal load data");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RELOAD LEFT
  // =========================
  const reloadLeft = async (): Promise<void> => {
    setLoadingLeft(true);
    try {
      const res: RollingAlatItem[] = await getRollingAlatByGedung(from);

      setData((prev: RollingAlatItem[]) => {
        const others = prev.filter((item) => item.gedung_uji !== from);
        return [...others, ...res];
      });

      setTargetKeys((prev: Key[]) => {
        // ambil yang kanan tetap
        const rightKeys = prev.filter((key) => {
          const item = data.find((d) => d.key === key);
          return item?.gedung_uji === to;
        });

        return [
          ...rightKeys,
          ...res.filter((i) => i.direction === "right").map((i) => i.key),
        ];
      });
    } finally {
      setLoadingLeft(false);
    }
  };

  // =========================
  // RELOAD RIGHT
  // =========================
  const reloadRight = async (): Promise<void> => {
    setLoadingRight(true);
    try {
      const res: RollingAlatItem[] = await getRollingAlatByGedung(to);

      setData((prev: RollingAlatItem[]) => {
        // ambil semua data selain gedung 2
        const others = prev.filter((item) => item.gedung_uji !== to);

        // gabungkan dengan hasil baru dari API
        return [...others, ...res];
      });

      // sync targetKeys
      setTargetKeys(res.map((item) => item.key));
    } finally {
      setLoadingRight(false);
    }
  };

  // =========================
  // INITIAL EFFECT
  // =========================
  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // TRANSFER CHANGE
  // =========================
  const handleChange = (nextTargetKeys: Key[]): void => {
    setTargetKeys(nextTargetKeys);

    setData((prev: RollingAlatItem[]) =>
      prev.map((item: RollingAlatItem) => ({
        ...item,
        direction: nextTargetKeys.includes(item.key) ? "right" : "left",
        gedung_uji: nextTargetKeys.includes(item.key) ? to : from,
      })),
    );
  };

  // =========================
  // CHECKBOX CHANGE
  // =========================
  const handleCheckbox = (
    key: number,
    field: keyof Omit<
      RollingAlatItem,
      "key" | "title" | "direction" | "gedung_uji"
    >,
    value: boolean,
  ): void => {
    setData((prev: RollingAlatItem[]) =>
      prev.map((item: RollingAlatItem) =>
        item.key === key ? { ...item, [field]: value } : item,
      ),
    );
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      await saveRollingAlat(data);
      showSuccessAlert("Berhasil menyimpan");
    } catch {
      showErrorAlert("Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    targetKeys,
    loading,
    loadingLeft,
    loadingRight,
    handleChange,
    handleCheckbox,
    handleSubmit,
    reloadLeft,
    reloadRight,
  };
}
