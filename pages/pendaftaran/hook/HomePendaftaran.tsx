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
  Table,
  message,
  DatePicker,
} from "antd";
import { SearchOutlined, SaveOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

import {
  searchKendaraan,
  createPendaftaran,
} from "@/services/pendaftaran.service";
import { getStatusPenerbitan, getBiroJasa } from "@/services/options.service";

import AppDivider from "@/components/common/AppDivider";
import { useWilayah } from "@/pages/master/kendaraan/hook/options/useWilayah";
import Search from "antd/es/input/Search";

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
  // LOAD MASTER (FIX LABEL SAFE)
  // =========================
  useEffect(() => {
    const load = async () => {
      const [s, b] = await Promise.all([getStatusPenerbitan(), getBiroJasa()]);

      setStatusOptions(
        (s.data || []).map((i: any) => ({
          label: i.label ?? String(i.value),
          value: String(i.value),
        })),
      );

      setBiroOptions(
        (b.data || []).map((i: any) => ({
          label: i.label ?? String(i.value),
          value: String(i.value),
        })),
      );
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
  // PREFILL (FIX WILAYAH STABLE)
  // =========================
  useEffect(() => {
    if (!data) return;

    const run = async () => {
      const prov = String(data.provinsi_id);
      const kota = String(data.kota_id);
      const kec = String(data.kecamatan_id);
      const kel = String(data.kelurahan_id);

      form.setFieldsValue({
        no_kendaraan: data.no_kendaraan,
        nama_pemilik: data.nama_pemilik,
        no_hp: data.no_hp,
        alamat: data.alamat,

        tanggal_uji: dayjs(),
        tanggal_mati_uji: data.tanggal_mati_uji
          ? dayjs(data.tanggal_mati_uji)
          : null,

        is_biro_jasa: !!data.is_biro_jasa,
        biro_jasa_id: data.biro_jasa_id ? String(data.biro_jasa_id) : null,

        provinsi_id: prov,
      });

      await wilayah.onChangeProvinsi(prov);
      await wilayah.onChangeKota(kota);
      await wilayah.onChangeKecamatan(kec);

      // 🔥 delay ensure options ready
      setTimeout(() => {
        form.setFieldsValue({
          kota_id: kota,
          kecamatan_id: kec,
          kelurahan_id: kel,
        });
      }, 300);
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
    <>
      <Row gutter={16}>
        {/* ================= LEFT ================= */}
        <Col span={8}>
          <Card title="Search & Kendaraan">
            <Form
              form={form}
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              colon={false}
            >
              <Form.Item name="status_penerbitan_id" label="Jenis Uji">
                <Select
                  options={statusOptions}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>

              <Form.Item name="q" label="Query">
                <Search
                  placeholder="No Uji / No Rangka / No Mesin"
                  enterButton="Search"
                  loading={loading}
                  onPressEnter={handleSearch}
                  onSearch={handleSearch}
                />
              </Form.Item>

              <>
                <AppDivider title="Data Kendaraan" />

                <Form.Item label="No Uji" name="no_uji">
                  <Input disabled />
                </Form.Item>

                <Form.Item name="no_kendaraan" label="No Kendaraan">
                  <Input />
                </Form.Item>

                <Form.Item label="Mesin" name="no_mesin">
                  <Input disabled />
                </Form.Item>

                <Form.Item label="Rangka" name="no_rangka">
                  <Input disabled />
                </Form.Item>

                <Form.Item name="tanggal_uji" label="Tgl Uji">
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item name="tanggal_mati_uji" label="Mati Uji">
                  <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                </Form.Item>
              </>
            </Form>
          </Card>
        </Col>

        {/* ================= MID ================= */}
        <Col span={8}>
          <Card title="Pemilik & Wilayah">
            <Form
              form={form}
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              colon={false}
            >
              <Form.Item name="nama_pemilik" label="Nama">
                <Input />
              </Form.Item>

              <Form.Item
                name="no_hp"
                label="No HP"
                rules={[
                  {
                    pattern: /^[0-9]+$/,
                    message: "Only numbers allowed",
                  },
                  {
                    min: 10,
                    message: "Minimal 10 digits",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="alamat" label="Alamat">
                <Input />
              </Form.Item>

              <Form.Item
                name="provinsi_id"
                label="Provinsi"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  showSearch
                  options={wilayah.provinsi}
                  onChange={wilayah.onChangeProvinsi}
                />
              </Form.Item>

              <Form.Item
                name="kota_id"
                label="Kota"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  showSearch
                  options={wilayah.kota}
                  onChange={wilayah.onChangeKota}
                />
              </Form.Item>

              <Form.Item
                name="kecamatan_id"
                label="Kec"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select
                  showSearch
                  options={wilayah.kecamatan}
                  onChange={wilayah.onChangeKecamatan}
                />
              </Form.Item>

              <Form.Item
                name="kelurahan_id"
                label="Kel"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select options={wilayah.kelurahan} />
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* ================= RIGHT ================= */}
        <Col span={8}>
          <Card title="Biro Jasa & Action">
            <Form
              form={form}
              layout="horizontal"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              colon={false}
            >
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
    </>
  );
}
