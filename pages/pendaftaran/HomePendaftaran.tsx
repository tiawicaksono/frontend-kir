// /app/pendaftaran/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import { Form, Card, Button, message, Row, Col } from "antd";

import { SaveOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import SearchKendaraan from "./SearchKendaraan";

import { pendaftaranSections } from "@/schema/pendaftaran.schema";

import { useWilayah } from "@/hooks/select-options/useWilayah";

import {
  searchKendaraan,
  createPendaftaran,
} from "@/services/pendaftaran.service";

import {
  getStatusPenerbitan,
  getBiroJasa,
  getArea,
} from "@/services/options.service";

import FormRenderer from "@/components/FormRenderer";

import { mapApiToForm, mergePayload } from "@/utils/formHelper";

// ====================================
// OPTION MAPPER
// ====================================

const mapOptions = (data: any[]) =>
  (data || []).map((i: any) => ({
    label: i.label ?? i.nama ?? String(i.value),
    value: Number(i.value ?? i.id),
  }));

export default function HomePendaftaran() {
  const [form] = Form.useForm();

  // ====================================
  // STATE
  // ====================================

  const [statusOptions, setStatusOptions] = useState<any[]>([]);

  const [biroOptions, setBiroOptions] = useState<any[]>([]);

  const [areaOptions, setAreaOptions] = useState<any[]>([]);

  const [kendaraan, setKendaraan] = useState<any>(null);

  const [searchLoading, setSearchLoading] = useState(false);

  const current = form.getFieldsValue();

  // ====================================
  // WATCH
  // SSR SAFE
  // ====================================

  const values = Form.useWatch([], form) || {};

  // ====================================
  // WILAYAH
  // ====================================

  const wilayah = useWilayah(form, false);

  // ====================================
  // LOAD MASTER
  // ====================================

  useEffect(() => {
    const load = async () => {
      try {
        const [statusRes, biroRes, areaRes] = await Promise.all([
          getStatusPenerbitan(),
          getBiroJasa(),
          getArea(),
        ]);

        setStatusOptions(mapOptions(statusRes.data));

        setBiroOptions(mapOptions(biroRes.data));

        setAreaOptions(mapOptions(areaRes.data));
      } catch (err) {
        console.error(err);

        message.error("Gagal load master");
      }
    };

    load();
  }, []);

  // ====================================
  // ALL SECTIONS
  // ====================================

  const allSections = useMemo(
    () =>
      pendaftaranSections({
        statusOptions,
        biroOptions,
        areaOptions,
      }),

    [statusOptions, biroOptions, areaOptions],
  );

  // ====================================
  // SPLIT 3 COLS
  // kiri:
  // - pendaftaran
  // - kendaraan
  //
  // tengah:
  // - pemilik
  // - wilayah
  //
  // kanan:
  // - biro jasa
  // ====================================

  const leftSections = allSections.filter((s) =>
    ["JENIS UJI", "DATA KENDARAAN"].includes(s.title),
  );

  const middleSections = allSections.filter((s) =>
    ["PEMILIK", "WILAYAH"].includes(s.title),
  );

  const rightSections = allSections.filter((s) =>
    ["BIRO JASA"].includes(s.title),
  );

  // ====================================
  // SEARCH
  // ====================================

  const handleSearch = async (q: string) => {
    try {
      setSearchLoading(true);

      const values = form.getFieldsValue();

      if (!values.status_penerbitan_id) {
        message.warning("Pilih jenis uji");

        return;
      }

      const res = await searchKendaraan(q, values.status_penerbitan_id);

      if (!res?.found) {
        message.warning("Data tidak ditemukan");

        return;
      }

      setKendaraan(res.data);
    } catch (err) {
      console.error(err);

      message.error("Gagal search");
    } finally {
      setSearchLoading(false);
    }
  };

  // ====================================
  // PREFILL
  // ====================================

  useEffect(() => {
    if (!kendaraan) return;

    const run = async () => {
      try {
        const prov = Number(kendaraan?.provinsi_id);

        const kota = Number(kendaraan?.kota_id);

        const kec = Number(kendaraan?.kecamatan_id);

        const kel = Number(kendaraan?.kelurahan_id);

        // ====================================
        // BASE VALUE
        // ====================================

        form.setFieldsValue({
          ...mapApiToForm(kendaraan, allSections),

          status_penerbitan_id: current.status_penerbitan_id,

          q: current.q,

          tanggal_uji: dayjs(),

          provinsi_id: prov || undefined,

          is_biro_jasa: !!kendaraan?.is_biro_jasa,

          biro_jasa_id: kendaraan?.biro_jasa_id
            ? Number(kendaraan.biro_jasa_id)
            : undefined,
        });

        // ====================================
        // LOAD WILAYAH
        // ====================================

        if (prov) {
          await wilayah.loadKota(prov);
        }

        if (kota) {
          await wilayah.loadKecamatan(kota);
        }

        if (kec) {
          await wilayah.loadKelurahan(kec);
        }

        // ====================================
        // SET CHILD VALUE
        // ====================================

        form.setFieldsValue({
          kota_id: kota || undefined,
          kecamatan_id: kec || undefined,
          kelurahan_id: kel || undefined,
        });
      } catch (err) {
        console.error(err);
      }
    };

    run();
  }, [kendaraan]);

  // ====================================
  // SUBMIT
  // ====================================

  const handleSubmit = async () => {
    try {
      const validated = await form.validateFields();

      const payload = mergePayload(kendaraan, validated);

      await createPendaftaran(payload);

      message.success("Berhasil simpan");

      console.log(payload);
    } catch (err) {
      console.error(err);

      message.error("Gagal simpan");
    }
  };

  return (
    <Form form={form} layout="horizontal" labelCol={{ span: 8 }}>
      <Row gutter={16}>
        {/* ==================================== */}
        {/* LEFT */}
        {/* ==================================== */}

        <Col xs={24} lg={8}>
          {/* DATA */}
          <FormRenderer
            sections={leftSections}
            values={{
              ...values,
              handleSearch,
              searchLoading,
            }}
            wilayah={wilayah}
          />
        </Col>

        {/* ==================================== */}
        {/* MIDDLE */}
        {/* ==================================== */}

        <Col xs={24} lg={8}>
          <FormRenderer
            sections={middleSections}
            values={{
              ...values,
              handleSearch,
              searchLoading,
            }}
            wilayah={wilayah}
          />
        </Col>

        {/* ==================================== */}
        {/* RIGHT */}
        {/* ==================================== */}

        <Col xs={24} lg={8}>
          <FormRenderer
            sections={rightSections}
            values={{
              ...values,
              handleSearch,
              searchLoading,
            }}
            wilayah={wilayah}
          />

          {/* ACTION */}
          <Card>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              block
            >
              Simpan
            </Button>
          </Card>
        </Col>
      </Row>
    </Form>
  );
}
