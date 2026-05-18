"use client";

import { useMemo, useState } from "react";

import { Table, Input, Button, Space, Select, DatePicker } from "antd";

import type { TableRowSelection } from "antd/es/table/interface";

import { ReloadOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import TableActions from "./TableActions";

interface Sorter {
  field?: string;
  order?: "ascend" | "descend";
}

interface Props {
  columns: any[];
  dataSource: any[];
  loading: boolean;
  total: number;

  page: number;
  pageSize: number;

  config?: {
    dateFields?: string[];

    // 🔥 FILTER DATE STANDALONE
    showTanggalFilter?: boolean;
    tanggalField?: string;
  };

  onChange: (params: {
    page?: number;
    limit?: number;
    search?: string;
    search_by?: string;
    filters?: any;
    sorter?: Sorter;

    // 🔥 CUSTOM FILTER
    tanggal_pendaftaran?: string;
  }) => void;

  onReload: () => void;

  showActions?: boolean;
  renderActions?: (record: any) => React.ReactNode;

  rowKeyField?: string;

  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;

  // =========================
  // ROW
  // =========================
  onRow?: (record: any) => any;

  // =========================
  // BULK SELECTION
  // =========================
  rowSelection?: TableRowSelection<any>;
}

export default function DynamicTable({
  columns,
  dataSource,
  loading,
  total,
  page,
  pageSize,
  config,
  onChange,
  onReload,
  showActions = false,
  renderActions,
  rowKeyField = "id",
  onEdit,
  onDelete,
  onRow,
  rowSelection,
}: Props) {
  const [searchBy, setSearchBy] = useState<string>();

  const [tanggal, setTanggal] = useState<any>(dayjs());

  // =========================
  // ROW KEY (FIXED)
  // =========================
  const getRowKey = (record: any): React.Key => {
    if (record?.[rowKeyField] !== undefined) {
      return record[rowKeyField];
    }

    if (record?.id !== undefined) {
      return record.id;
    }

    const dynamicKey = Object.keys(record || {}).find((k) => k.endsWith("_id"));

    if (dynamicKey) {
      return record[dynamicKey];
    }

    return JSON.stringify(record);
  };

  // =========================
  // FINAL COLUMNS
  // =========================
  const finalColumns = useMemo(() => {
    return [
      ...columns,

      ...(showActions
        ? [
            {
              title: "Actions",
              align: "center" as const,
              width: 80,

              render: (_: any, record: any) => (
                <div className="flex justify-center">
                  {renderActions ? (
                    renderActions(record)
                  ) : (
                    <TableActions
                      record={record}
                      rowKeyField={rowKeyField}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  )}
                </div>
              ),
            },
          ]
        : []),
    ];
  }, [columns, showActions, renderActions, rowKeyField, onEdit, onDelete]);

  return (
    <>
      {/* ========================= */}
      {/* FILTER */}
      {/* ========================= */}
      <div className="flex justify-between mb-4">
        <Space wrap>
          {/* ========================= */}
          {/* TANGGAL FILTER */}
          {/* ========================= */}
          {config?.showTanggalFilter && (
            <DatePicker
              placeholder="Tanggal Pendaftaran"
              value={tanggal}
              format="DD/MM/YYYY"
              onChange={(date) => {
                setTanggal(date);

                onChange({
                  tanggal_pendaftaran: date
                    ? date.format("YYYY-MM-DD")
                    : undefined,

                  page: 1,
                });
              }}
            />
          )}

          {/* ========================= */}
          {/* SEARCH BY */}
          {/* ========================= */}
          <Select
            placeholder="Search By"
            allowClear
            style={{ width: 180 }}
            value={searchBy}
            onChange={(val) => setSearchBy(val)}
            options={(columns || [])
              .filter((col) => col.searchable)
              .map((col) => ({
                label: col.searchLabel || col.title,
                value: col.searchField,
              }))}
          />

          {/* ========================= */}
          {/* SEARCH */}
          {/* ========================= */}
          <Input.Search
            placeholder="Search..."
            allowClear
            style={{ width: 240 }}
            onSearch={(val) =>
              onChange({
                search: val || undefined,
                search_by: searchBy,
                page: 1,
              })
            }
          />
        </Space>

        <Button icon={<ReloadOutlined />} onClick={onReload}>
          Reload
        </Button>
      </div>

      {/* ========================= */}
      {/* TABLE */}
      {/* ========================= */}
      <Table
        rowKey={getRowKey}
        columns={finalColumns}
        dataSource={dataSource ?? []}
        loading={loading}
        onRow={onRow}
        rowSelection={rowSelection}
        pagination={{
          current: page,
          pageSize,
          total,
          showSizeChanger: true,
        }}
        onChange={(pag, filters, sorter: any) => {
          onChange({
            page: pag.current,
            limit: pag.pageSize,
            filters,

            sorter: {
              field: sorter?.field,
              order: sorter?.order,
            },
          });
        }}
      />
    </>
  );
}
