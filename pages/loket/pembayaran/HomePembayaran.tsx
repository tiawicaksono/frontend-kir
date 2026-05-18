"use client";

import { useState, useEffect, useMemo } from "react";

import { Card, Badge, Tag, Dropdown, Space, Button } from "antd";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

import AutoBreadcrumb from "@/components/common/AutoBreadcrumb";

import DynamicTable from "@/components/ui/dynamic-table/DynamicTable";

import { useConfirm } from "@/core/confirm/confirm.hook";
import { useShowAlert } from "@/core/alert/alert.hook";

import {
  fetchPembayaran,
  deletePembayaran,
  togglePembayaran,
} from "@/services/pembayaran.service";

import { getPendaftaranTagColor } from "@/utils/jenisPendaftaranTag";

import PendaftaranEditModal from "@/pages/loket/pendaftaran/PendaftaranEditModal";

import PembayaranFilter from "./PembayaranFilter";
import ComponentCard from "@/components/common/ComponentCard";

export default function HomePembayaran() {
  const { confirm } = useConfirm();

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const [table, setTable] = useState<any>({
    dataSource: [],
    loading: false,
    total: 0,

    params: {
      page: 1,
      limit: 10,

      sort_by: "no_pendaftaran_harian",
      sort_order: "desc",

      search: undefined,
      search_by: undefined,

      tanggal_pendaftaran: dayjs().format("YYYY-MM-DD"),

      status_pembayaran: undefined,
      status_penerbitan_id: undefined,
    },
  });

  const [loadingId, setLoadingId] = useState<number | null>(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const [editOpen, setEditOpen] = useState(false);

  const [editData, setEditData] = useState<any>(null);

  // =========================
  // FETCH
  // =========================
  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setTable((p: any) => ({
          ...p,
          loading: true,
        }));

        const res = await fetchPembayaran(table.params);

        if (!active) return;

        setTable((p: any) => ({
          ...p,

          loading: false,

          dataSource: res?.data ?? [],

          total: res?.meta?.total ?? 0,
        }));

        setSelectedRowKeys([]);
      } catch (err) {
        if (!active) return;

        setTable((p: any) => ({
          ...p,
          loading: false,
        }));

        showErrorAlert(err, "Gagal load data");
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [table.params]);

  // =========================
  // RELOAD
  // =========================
  const handleReload = async () => {
    try {
      setTable((p: any) => ({
        ...p,
        loading: true,
      }));

      const res = await fetchPembayaran(table.params);

      setTable((p: any) => ({
        ...p,

        loading: false,

        dataSource: res?.data ?? [],

        total: res?.meta?.total ?? 0,
      }));
    } catch (err) {
      setTable((p: any) => ({
        ...p,
        loading: false,
      }));

      showErrorAlert(err, "Gagal reload");
    }
  };

  // =========================
  // TABLE CHANGE
  // =========================
  const handleTableChange = (payload: any) => {
    setTable((p: any) => ({
      ...p,

      params: {
        ...p.params,

        ...payload,

        sort_by: payload?.sorter?.field ?? payload?.sort_by ?? p.params.sort_by,

        sort_order:
          payload?.sorter?.order === "ascend"
            ? "asc"
            : payload?.sorter?.order === "descend"
              ? "desc"
              : (payload?.sort_order ?? p.params.sort_order),
      },
    }));
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: "Hapus Data",
      message: "Yakin hapus data ini?",
      variant: "destructive",
    });

    if (!ok) return;

    try {
      await deletePembayaran(id);

      setTable((p: any) => ({
        ...p,

        dataSource: p.dataSource.filter((x: any) => x.id !== id),
      }));

      showSuccessAlert("Berhasil dihapus");
    } catch (err) {
      showErrorAlert(err, "Gagal hapus");
    }
  };

  // =========================
  // TOGGLE
  // =========================
  const handleToggle = async (row: any) => {
    setLoadingId(row.id);

    try {
      const res = await togglePembayaran(row.id);

      setTable((p: any) => ({
        ...p,

        dataSource: p.dataSource.map((item: any) =>
          item.id === row.id
            ? {
                ...item,

                retribusi_status_pembayaran:
                  res?.data?.status_pembayaran ??
                  !item.retribusi_status_pembayaran,
              }
            : item,
        ),
      }));

      showSuccessAlert("Status diperbarui");
    } catch (err) {
      showErrorAlert(err, "Gagal update");
    } finally {
      setLoadingId(null);
    }
  };

  // =========================
  // BULK TOGGLE
  // =========================
  const handleBulkToggle = async () => {
    const ok = await confirm({
      title: "Ubah Status Massal",
      message: `Ubah ${selectedRowKeys.length} data?`,
      variant: "destructive",
    });

    if (!ok) return;

    try {
      setTable((p: any) => ({
        ...p,
        loading: true,
      }));

      await Promise.all(selectedRowKeys.map((id) => togglePembayaran(id)));

      setTable((p: any) => ({
        ...p,

        loading: false,

        dataSource: p.dataSource.map((item: any) =>
          selectedRowKeys.includes(item.id)
            ? {
                ...item,

                retribusi_status_pembayaran: !item.retribusi_status_pembayaran,
              }
            : item,
        ),
      }));

      setSelectedRowKeys([]);

      showSuccessAlert("Bulk update berhasil");
    } catch (err) {
      setTable((p: any) => ({
        ...p,
        loading: false,
      }));

      showErrorAlert(err, "Bulk update gagal");
    }
  };

  // =========================
  // EDIT
  // =========================
  const handleOpenEdit = (row: any) => {
    setEditData(row);

    setEditOpen(true);
  };

  const handleEditSuccess = (updated: any) => {
    setTable((p: any) => ({
      ...p,

      dataSource: p.dataSource.map((item: any) =>
        item.id === updated.id
          ? {
              ...item,
              ...updated,
            }
          : item,
      ),
    }));
  };

  // =========================
  // COLUMNS
  // =========================
  const columns = useMemo(
    () => [
      {
        title: "No Antrian",

        dataIndex: "no_pendaftaran_harian",

        key: "no_pendaftaran_harian",

        sorter: true,

        searchable: true,

        searchField: "no_pendaftaran_harian",

        render: (val: any) => <strong>{val || "-"}</strong>,
      },

      {
        title: "Tanggal Uji",

        dataIndex: "tanggal_uji",

        render: (val: any) => (val ? dayjs(val).format("DD/MM/YYYY") : "-"),
      },

      {
        title: "No Uji",

        dataIndex: "kendaraan_no_uji",

        searchable: true,

        searchField: "kendaraan.no_uji",
      },

      {
        title: "No Kendaraan",

        dataIndex: "kendaraan_no_kendaraan",

        searchable: true,

        searchField: "kendaraan.no_kendaraan",
      },

      {
        title: "Nama",

        dataIndex: "kendaraan_nama_pemilik",

        searchable: true,

        searchField: "kendaraan.nama_pemilik",
      },

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

        render: (_: any, row: any) => (
          <Tag
            color={getPendaftaranTagColor(row.status_penerbitan_issuance_id)}
          >
            {row.status_penerbitan_issuance_name}
          </Tag>
        ),
      },

      {
        title: "Petugas",

        dataIndex: "petugas_name",
      },
    ],
    [],
  );

  return (
    <div>
      <ComponentCard
        title="Manajemen Pembayaran"
        borderTop={true}
        extra={
          <Space>
            <Button
              type="primary"
              disabled={selectedRowKeys.length === 0}
              onClick={handleBulkToggle}
            >
              Ubah Status ({selectedRowKeys.length})
            </Button>
          </Space>
        }
      >
        <DynamicTable
          columns={columns}
          dataSource={table.dataSource}
          loading={table.loading}
          total={table.total}
          page={table.params.page}
          pageSize={table.params.limit}
          onChange={handleTableChange}
          onReload={handleReload}
          rowKeyField="id"
          toolbar={
            <PembayaranFilter
              filters={table.params}
              loading={table.loading}
              onChange={handleTableChange}
            />
          }
          config={{
            showToolbar: true,
          }}
          rowSelection={{
            selectedRowKeys,

            onChange: (keys) => setSelectedRowKeys(keys as number[]),
          }}
          showActions
          renderActions={(row: any) => {
            const menuItems = [
              {
                key: "toggle",

                label: (
                  <span className="flex items-center gap-2">
                    {row.retribusi_status_pembayaran ? (
                      <>
                        <CloseCircleOutlined />
                        Tandai Belum Bayar
                      </>
                    ) : (
                      <>
                        <CheckCircleOutlined />
                        Tandai Lunas
                      </>
                    )}
                  </span>
                ),

                disabled: loadingId === row.id,

                onClick: () => handleToggle(row),
              },

              {
                key: "edit",

                label: (
                  <span className="flex items-center gap-2">
                    <EditOutlined />
                    Edit
                  </span>
                ),

                onClick: () => handleOpenEdit(row),
              },

              {
                key: "delete",

                label: (
                  <span className="flex items-center gap-2 text-red-500">
                    <DeleteOutlined />
                    Delete
                  </span>
                ),

                onClick: () => handleDelete(row.id),
              },
            ];

            return (
              <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
                <MoreOutlined className="cursor-pointer" />
              </Dropdown>
            );
          }}
        />
      </ComponentCard>

      <PendaftaranEditModal
        open={editOpen}
        data={editData}
        onClose={() => setEditOpen(false)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}
