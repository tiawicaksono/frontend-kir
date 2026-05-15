"use client";

import { useEffect, useMemo, useState } from "react";

import { Form, Card, Button, message, Row, Col } from "antd";

import { SaveOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

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

import { mapApiToForm } from "@/utils/formHelper";

import { useShowAlert } from "@/core/alert/alert.hook";

// ====================================
// OPTION MAPPER
// ====================================

const mapOptions = (data: any[]) =>
  (data || []).map((i: any) => ({
    label: i.label ?? i.nama ?? String(i.value),
    value: Number(i.value ?? i.id),
  }));

interface Props {
  onCreated?: (data: any) => void;
}
export default function HomePendaftaran({ onCreated }: Props) {
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

  const { showErrorAlert, showSuccessAlert } = useShowAlert();

  const [submitLoading, setSubmitLoading] = useState(false);

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
      setSubmitLoading(true);

      const values = await form.validateFields();

      const payload = {
        kendaraan_id: kendaraan?.id,

        no_kendaraan: values.no_kendaraan,
        no_mesin: values.no_mesin,
        no_rangka: values.no_rangka,

        status_penerbitan_id: values.status_penerbitan_id,

        tanggal_uji: values.tanggal_uji?.format("YYYY-MM-DD"),

        tanggal_mati_uji: values.tanggal_mati_uji?.format("YYYY-MM-DD"),

        nama_pemilik: values.nama_pemilik,
        identitas: values.identitas,
        no_identitas: values.no_identitas,
        alamat: values.alamat,
        no_hp: values.no_hp,

        provinsi_id: values.provinsi_id,
        kota_id: values.kota_id,
        kecamatan_id: values.kecamatan_id,
        kelurahan_id: values.kelurahan_id,

        is_dikuasakan: values.is_biro_jasa,

        biro_jasa_id: values.biro_jasa_id || null,

        no_kartu_hilang: values.no_kartu_hilang || null,

        area_asal_id: values.area_asal_id || null,
      };

      const res = await createPendaftaran(payload);

      // ====================================
      // ADD ROW TO TABLE
      // ====================================

      if (res?.data) {
        onCreated?.(res.data);
      }

      showSuccessAlert(res?.message || "Berhasil simpan");

      // RESET
      form.resetFields();

      setKendaraan(null);

      // RESET WILAYAH
      wilayah.setKota([]);
      wilayah.setKecamatan([]);
      wilayah.setKelurahan([]);
    } catch (err: any) {
      console.error(err);

      showErrorAlert(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Form form={form} layout="horizontal" labelCol={{ span: 8 }} colon={false}>
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
              loading={submitLoading}
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
