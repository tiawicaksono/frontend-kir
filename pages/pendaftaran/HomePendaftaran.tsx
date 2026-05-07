"use client";

import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Select,
  Input,
  Button,
  message,
  DatePicker,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
  searchKendaraan,
  createPendaftaran,
} from "@/services/pendaftaran.service";
import { getStatusPenerbitan, getBiroJasa } from "@/services/options.service";

import AppDivider from "@/components/common/AppDivider";
import { useWilayah } from "@/hooks/select-options/useWilayah";
import Search from "antd/es/input/Search";

// 🔥 mapper kecil (biar konsisten)
const mapOptions = (data: any[]) =>
  (data || []).map((i: any) => ({
    label: i.label ?? i.nama ?? String(i.value),
    value: Number(i.value ?? i.id),
  }));

export default function HomePendaftaran() {
  const [form] = Form.useForm();
  const isBiroJasa = Form.useWatch("is_biro_jasa", form);

  const [statusOptions, setStatusOptions] = useState<any[]>([]);
  const [biroOptions, setBiroOptions] = useState<any[]>([]);

  const [state, setState] = useState<"idle" | "found" | "not_found">("idle");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const wilayah = useWilayah(form, false);

  // =========================
  // LOAD MASTER
  // =========================
  useEffect(() => {
    const load = async () => {
      const [s, b] = await Promise.all([getStatusPenerbitan(), getBiroJasa()]);

      setStatusOptions(mapOptions(s.data));
      setBiroOptions(mapOptions(b.data));
    };

    load();
  }, []);

  // =========================
  // SEARCH
  // =========================
  const handleSearch = async () => {
    const values = form.getFieldsValue();

    if (!values.status_penerbitan_id) {
      message.warning("Pilih status dulu");
      return;
    }

    setLoading(true);
    try {
      const res = await searchKendaraan(values.q, values.status_penerbitan_id);

      if (res.found) {
        setState("found");
        setData(res.data);
      } else {
        setState("not_found");
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PREFILL (FIX TOTAL)
  // =========================
  useEffect(() => {
    if (!data) return;

    const run = async () => {
      const prov = Number(data.provinsi_id);
      const kota = Number(data.kota_id);
      const kec = Number(data.kecamatan_id);
      const kel = Number(data.kelurahan_id);

      form.setFieldsValue({
        no_uji: data.no_uji,
        no_rangka: data.no_rangka,
        no_mesin: data.no_mesin,
        no_kendaraan: data.no_kendaraan,
        nama_pemilik: data.nama_pemilik,
        no_hp: data.no_hp,
        alamat: data.alamat,

        tanggal_uji: dayjs(),
        tanggal_mati_uji: data.tanggal_mati_uji
          ? dayjs(data.tanggal_mati_uji)
          : null,

        is_biro_jasa: !!data.is_biro_jasa,
        biro_jasa_id: data.biro_jasa_id ? Number(data.biro_jasa_id) : null,

        provinsi_id: prov,
      });

      // 🔥 load berurutan (NO RACE)
      await wilayah.loadKota(prov);
      await wilayah.loadKecamatan(kota);
      await wilayah.loadKelurahan(kec);

      form.setFieldsValue({
        kota_id: kota,
        kecamatan_id: kec,
        kelurahan_id: kel,
      });
    };

    run();
  }, [data]);

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    const values = form.getFieldsValue();

    await createPendaftaran({
      ...data,
      ...values,
    });

    message.success("Berhasil simpan");
  };

  return (
    <Row gutter={16}>
      {/* LEFT */}
      <Col span={8}>
        <Card title="Search & Kendaraan">
          <Form form={form} layout="vertical">
            <Form.Item name="status_penerbitan_id" label="Jenis Uji">
              <Select
                options={statusOptions}
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>

            <Form.Item name="q" label="Query">
              <Search
                enterButton="Search"
                loading={loading}
                onSearch={handleSearch}
              />
            </Form.Item>

            <AppDivider title="Data Kendaraan" />

            <Form.Item name="no_uji" label="No Uji">
              <Input />
            </Form.Item>

            <Form.Item name="no_kendaraan" label="No Kendaraan">
              <Input />
            </Form.Item>

            <Form.Item name="no_mesin" label="Mesin">
              <Input />
            </Form.Item>

            <Form.Item name="no_rangka" label="Rangka">
              <Input />
            </Form.Item>

            <Form.Item name="tanggal_uji" label="Tgl Uji">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name="tanggal_mati_uji" label="Mati Uji">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      {/* MID */}
      <Col span={8}>
        <Card title="Pemilik & Wilayah">
          <Form form={form} layout="vertical">
            <Form.Item name="nama_pemilik" label="Nama">
              <Input />
            </Form.Item>

            <Form.Item name="no_hp" label="No HP">
              <Input />
            </Form.Item>

            <Form.Item name="alamat" label="Alamat">
              <Input />
            </Form.Item>

            <Form.Item name="provinsi_id" label="Provinsi">
              <Select
                showSearch
                optionFilterProp="label"
                options={wilayah.provinsi}
                onChange={wilayah.onChangeProvinsi}
              />
            </Form.Item>

            <Form.Item name="kota_id" label="Kota">
              <Select
                showSearch
                optionFilterProp="label"
                options={wilayah.kota}
                onChange={wilayah.onChangeKota}
              />
            </Form.Item>

            <Form.Item name="kecamatan_id" label="Kecamatan">
              <Select
                showSearch
                optionFilterProp="label"
                options={wilayah.kecamatan}
                onChange={wilayah.onChangeKecamatan}
              />
            </Form.Item>

            <Form.Item name="kelurahan_id" label="Kelurahan">
              <Select
                showSearch
                optionFilterProp="label"
                options={wilayah.kelurahan}
              />
            </Form.Item>
          </Form>
        </Card>
      </Col>

      {/* RIGHT */}
      <Col span={8}>
        <Card title="Biro Jasa & Action">
          <Form form={form} layout="vertical">
            <Form.Item name="is_biro_jasa" label="Diwakilkan">
              <Select
                options={[
                  { label: "Tidak", value: false },
                  { label: "Ya", value: true },
                ]}
              />
            </Form.Item>

            {isBiroJasa && (
              <Form.Item name="biro_jasa_id" label="Biro">
                <Select
                  options={biroOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            )}

            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSubmit}
              block
            >
              Simpan
            </Button>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
