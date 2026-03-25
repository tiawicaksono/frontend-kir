"use client";

import { Table, Input, Button, Space, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import TableActions from "./TableActions";
import { useState } from "react";

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

  onChange: (params: {
    page?: number;
    limit?: number;
    search?: string;
    search_by?: string;
    filters?: any;
    sorter?: Sorter;
  }) => void;

  onReload: () => void;

  showActions?: boolean;
  renderActions?: (record: any) => React.ReactNode;
  rowKeyField?: string;

  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
}

export default function DynamicTable({
  columns,
  dataSource,
  loading,
  total,
  page,
  pageSize,
  onChange,
  onReload,
  showActions = false,
  renderActions,
  rowKeyField,
  onEdit,
  onDelete,
}: Props) {
  const [searchBy, setSearchBy] = useState<string | undefined>();

  const getRowKey = (record: any) => {
    return rowKeyField
      ? record?.[rowKeyField]
      : record?.id ||
          Object.keys(record || {}).find((k) => k.endsWith("_id")) ||
          JSON.stringify(record);
  };

  const finalColumns = [
    ...columns,
    ...(showActions
      ? [
          {
            title: "Actions",
            align: "center",
            width: 50,
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

  return (
    <>
      <div className="flex justify-between mb-4">
        <Space>
          <Select
            placeholder="Search By"
            allowClear
            style={{ width: 180 }}
            onChange={(val) => setSearchBy(val)}
            options={columns
              .filter((col: any) => col.searchable) // 🔥 dari BE
              .map((col: any) => ({
                label: col.title,
                value: col.dataIndex,
              }))}
          />

          <Input.Search
            placeholder="Search..."
            allowClear
            onSearch={(val) =>
              onChange({ search: val, search_by: searchBy, page: 1 })
            }
          />
        </Space>

        <Button icon={<ReloadOutlined />} onClick={onReload}>
          Reload
        </Button>
      </div>

      <Table
        rowKey={getRowKey}
        columns={finalColumns}
        dataSource={dataSource}
        loading={loading || !columns.length}
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
