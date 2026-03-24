"use client";

import { Table, Input, Button, Space, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
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
}: Props) {
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
                  <TableActions record={record} rowKeyField={rowKeyField} />
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
            onChange={(val) => onChange({ search_by: val, page: 1 })}
            options={columns.map((col) => ({
              label: col.title,
              value: col.dataIndex,
            }))}
          />

          <Input.Search
            placeholder="Search..."
            allowClear
            onSearch={(val) => onChange({ search: val, page: 1 })}
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
