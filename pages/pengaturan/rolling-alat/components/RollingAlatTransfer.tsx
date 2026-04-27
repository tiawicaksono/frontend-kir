"use client";

import { Table, Transfer, Checkbox, Button } from "antd";
import type { TransferProps, TableColumnsType } from "antd";
import type { Key } from "react";
import { RollingAlatItem } from "@/services/rolling-alat.service";

type Props = {
  data: RollingAlatItem[];
  targetKeys: Key[];
  onChange: (keys: Key[]) => void;
  onCheckboxChange: (
    key: number,
    field: keyof Omit<
      RollingAlatItem,
      "key" | "title" | "direction" | "gedung_uji"
    >,
    value: boolean,
  ) => void;
  loadingLeft: boolean;
  loadingRight: boolean;
  onReloadLeft: () => void;
  onReloadRight: () => void;
};

export default function RollingAlatTransfer({
  data,
  targetKeys,
  onChange,
  onCheckboxChange,
  loadingLeft,
  loadingRight,
  onReloadLeft,
  onReloadRight,
}: Props) {
  // =========================
  // COLUMNS
  // =========================
  const columns: TableColumnsType<RollingAlatItem> = [
    {
      title: "User",
      dataIndex: "title",
      width: 150,
    },
    {
      title: "Prauji",
      render: (_, record) => (
        <Checkbox
          checked={record.prauji}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onCheckboxChange(record.key, "prauji", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Emisi",
      render: (_, record) => (
        <Checkbox
          checked={record.emisi}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onCheckboxChange(record.key, "emisi", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Lampu",
      render: (_, record) => (
        <Checkbox
          checked={record.lampu}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onCheckboxChange(record.key, "lampu", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Pitlift",
      render: (_, record) => (
        <Checkbox
          checked={record.pitlift}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onCheckboxChange(record.key, "pitlift", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Rem",
      render: (_, record) => (
        <Checkbox
          checked={record.rem}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onCheckboxChange(record.key, "rem", e.target.checked)
          }
        />
      ),
    },
  ];

  // =========================
  // FOOTER (RELOAD BUTTON)
  // =========================
  const renderFooter: TransferProps<RollingAlatItem>["footer"] = (_, info) => {
    const isLeft = info?.direction === "left";

    return (
      <div className="flex w-full px-2 py-1">
        <Button
          size="small"
          loading={isLeft ? loadingLeft : loadingRight}
          className={isLeft ? "" : "ml-auto"}
          onClick={isLeft ? onReloadLeft : onReloadRight}
        >
          Reload
        </Button>
      </div>
    );
  };

  // =========================
  // RENDER
  // =========================
  return (
    <Transfer
      dataSource={data}
      targetKeys={targetKeys}
      onChange={onChange}
      rowKey={(item) => item.key}
      style={{ width: "100%" }}
      titles={["Gedung 1", "Gedung 2"]}
      showSelectAll={false}
      footer={renderFooter}
    >
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys,
        disabled,
      }) => {
        const rowSelection = {
          selectedRowKeys: selectedKeys,
          onChange: (keys: Key[]) => {
            onItemSelectAll(keys, "replace");
          },
        };

        return (
          <Table
            columns={columns}
            dataSource={filteredItems}
            pagination={false}
            size="small"
            rowKey="key"
            rowSelection={rowSelection}
            className="w-full"
            style={{
              pointerEvents: disabled ? "none" : undefined,
            }}
            onRow={(record) => ({
              onClick: () => {
                onItemSelect(record.key, !selectedKeys.includes(record.key));
              },
            })}
            loading={direction === "left" ? loadingLeft : loadingRight}
          />
        );
      }}
    </Transfer>
  );
}
