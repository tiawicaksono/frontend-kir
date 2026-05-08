"use client";

import { Spin, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import RollingAlatTransfer from "./components/RollingAlatTransfer";
import { useRollingAlat } from "@/hooks/rolling-alat/useRollingAlat";
import ComponentCard from "@/components/common/ComponentCard";

export default function HomeRollingAlat() {
  const {
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
  } = useRollingAlat();

  return (
    <ComponentCard
      title="Rolling Alat"
      desc="Untuk mengatur jadwal penguji dibagian mana"
    >
      <RollingAlatTransfer
        data={data}
        targetKeys={targetKeys}
        onChange={handleChange}
        onCheckboxChange={handleCheckbox}
        loadingLeft={loadingLeft}
        loadingRight={loadingRight}
        onReloadLeft={reloadLeft}
        onReloadRight={reloadRight}
      />

      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          onClick={handleSubmit}
          icon={<SaveOutlined />}
          iconPlacement="start"
          loading={loading}
        >
          Simpan
        </Button>
      </div>
    </ComponentCard>
  );
}
