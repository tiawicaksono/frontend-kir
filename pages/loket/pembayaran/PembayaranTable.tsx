"use client";

import { Table, Badge, Dropdown, Button, Tag } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { getPendaftaranTagColor } from "@/utils/jenisPendaftaranTag";

interface Props {
  data: any[];
  loading: boolean;
  loadingId: number | null;

  onDelete: (id: number) => void;
  onToggle: (row: any) => void;

  selectedRowKeys: number[];
  setSelectedRowKeys: (keys: number[]) => void;

  onBulkToggle: () => void;

  onEdit: (row: any) => void;
}

export default function PembayaranTable({
  data,
  loading,
  loadingId,
  onDelete,
  onToggle,
  selectedRowKeys,
  setSelectedRowKeys,
  onBulkToggle,
  onEdit,
}: Props) {
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: any) => setSelectedRowKeys(keys),
  };

  const columns = [
    {
      title: "No Antrian",
      render: (_: any, row: any) => (
        <strong>{row.no_pendaftaran_harian || "-"}</strong>
      ),
    },
    {
      title: "Tanggal Uji",
      render: (_: any, row: any) =>
        row.tanggal_uji ? dayjs(row.tanggal_uji).format("DD/MM/YYYY") : "-",
    },
    { title: "No Uji", dataIndex: "kendaraan_no_uji" },
    { title: "No Kendaraan", dataIndex: "kendaraan_no_kendaraan" },
    { title: "Nama", dataIndex: "kendaraan_nama_pemilik" },
    {
      title: "Status",
      render: (_: any, row: any) => (
        <Badge
          status={row.retribusi_status_pembayaran ? "success" : "error"}
          text={row.retribusi_status_pembayaran ? "Lunas" : "Belum Bayar"}
        />
      ),
    },
    {
      title: "Pendaftaran",
      render: (_: any, row: any) => {
        return (
          <Tag
            color={getPendaftaranTagColor(row.status_penerbitan_issuance_id)}
          >
            {row.status_penerbitan_issuance_name}
          </Tag>
        );
      },
    },
    { title: "Petugas", dataIndex: "petugas_name" },

    {
      title: "Aksi",
      render: (_: any, row: any) => {
        const menuItems = [
          {
            key: "toggle",
            label: (
              <span className="flex items-center gap-2">
                {row.retribusi_status_pembayaran ? (
                  <>
                    <CloseCircleOutlined /> Tandai Belum Bayar
                  </>
                ) : (
                  <>
                    <CheckCircleOutlined /> Tandai Lunas
                  </>
                )}
              </span>
            ),
            disabled: loadingId === row.id,
            onClick: () => onToggle(row),
          },
          {
            key: "edit",
            label: (
              <span className="flex items-center gap-2">
                <EditOutlined /> Edit
              </span>
            ),
            onClick: () => onEdit(row),
          },
          {
            key: "delete",
            label: (
              <span className="flex items-center gap-2 text-red-500">
                <DeleteOutlined /> Delete
              </span>
            ),
            onClick: () => onDelete(row.id),
          },
        ];

        return (
          <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
            <MoreOutlined />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      {/* BULK ACTION */}
      <div className="flex justify-end mb-2">
        <Button
          type="primary"
          disabled={(selectedRowKeys?.length ?? 0) === 0}
          onClick={onBulkToggle}
        >
          Ubah Status ({selectedRowKeys?.length ?? 0})
        </Button>
      </div>

      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={false}
      />
    </div>
  );
}
