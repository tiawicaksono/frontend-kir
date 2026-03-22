"use client";

import { Table, Input, Button, Space, Select } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TableActions from "./TableActions";

interface Props {
  columns: any[];
  fetchData: (params: any) => Promise<{ data: any[]; total: number }>;
  showActions?: boolean;
  renderActions?: (record: any) => React.ReactNode;
  rowKeyField?: string;
}

export default function DynamicTable({
  columns,
  fetchData,
  showActions = false,
  renderActions,
  rowKeyField,
}: Props) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchBy, setSearchBy] = useState<string | undefined>();

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [filters, setFilters] = useState<any>({});
  const [sorter, setSorter] = useState<any>({});

  const loadData = async () => {
    setLoading(true);
    const cleanFilters: any = {};
    Object.keys(filters || {}).forEach((key) => {
      if (filters[key]) {
        cleanFilters[key] = filters[key];
      }
    });
    try {
      const res = await fetchData({
        page: pagination.current,
        limit: pagination.pageSize,
        search,
        search_by: searchBy,
        ...cleanFilters,
        sorter,
      });

      setData(res.data);

      setPagination((prev) => ({
        ...prev,
        total: res.total,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [
    pagination.current,
    pagination.pageSize,
    filters,
    sorter,
    search,
    // searchBy,
  ]);

  const handleChange = (pag: any, tableFilters: any, tableSorter: any) => {
    setPagination((prev) => ({
      ...prev,
      current: tableSorter.field ? 1 : pag.current,
      pageSize: pag.pageSize,
    }));

    setFilters(tableFilters);

    setSorter({
      field: tableSorter.field,
      order: tableSorter.order,
    });
  };

  const finalColumns = [
    ...columns,
    ...(showActions
      ? [
          {
            title: "Actions",
            render: (_: any, record: any) =>
              renderActions ? (
                renderActions(record)
              ) : (
                <TableActions record={record} rowKeyField={rowKeyField} />
              ),
          },
        ]
      : []),
  ];

  return (
    <>
      {/* 🔥 FILTER + RELOAD */}
      <div className="flex justify-between mb-4">
        <Space>
          <Select
            placeholder="Search By"
            allowClear
            style={{ width: 180 }}
            value={searchBy}
            onChange={(val) => setSearchBy(val)}
            options={columns.map((col) => ({
              label: col.title,
              value: col.dataIndex,
            }))}
          />

          <Input.Search
            placeholder="Search..."
            allowClear
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={() => {
              setPagination((prev) => ({ ...prev, current: 1 }));
              setSearch(searchInput); // trigger API
            }}
          />
        </Space>

        <Button icon={<ReloadOutlined />} onClick={loadData}>
          Reload
        </Button>
      </div>

      <Table
        rowKey={(record) =>
          rowKeyField
            ? record[rowKeyField]
            : record.id ||
              Object.keys(record).find((k) => k.endsWith("_id")) ||
              JSON.stringify(record)
        }
        columns={finalColumns}
        dataSource={data}
        loading={loading || !columns.length}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        // rowSelection={{
        //   selectedRowKeys,
        //   onChange: setSelectedRowKeys,
        // }}
        onChange={handleChange}
      />
    </>
  );
}
